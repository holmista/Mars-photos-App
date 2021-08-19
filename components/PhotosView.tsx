import React, {useContext, useReducer, forwardRef, useState, Ref, useImperativeHandle} from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { ActivityIndicator, Button} from 'react-native-paper';
import {theContext}  from '../utils/ContextPlaceholder'
import getPhotos from '../utils/getPhotos'
import Photo from './Photo'
import {PhotosViewV2} from './PhotosViewV2'
import {photosViewReducer} from '../utils/reducer'

interface RefObject {
    getData: () => void
  }

const isCloseToBottom = (thing:any) => {
  const paddingToBottom = 20;
  return thing.layoutMeasurement.height + thing.contentOffset.y >=
    thing.contentSize.height - paddingToBottom;
};



const initialState={
  photos:[] as Array<{cam:string,url:string}>,
  page:2,
  end:false,
  loading:false,
  clicked:0,
  idx:0,
  na:false
}



export const PhotosView = forwardRef((props, ref: Ref<RefObject>)=> {
    const [state, dispatch] = useReducer(photosViewReducer, initialState);

    
    const [photos, setPhotos]=useState<{cam:string, url:string}[]>([])
    const[page, setPage]=useState(1)
    // const[end, setEnd]=useState(false)
    // const[loading,setLoading]=useState(false)
    // const[clicked, setClicked]=useState(0)
    // const [idx, setIdx]=useState(0)
    const context=useContext(theContext)
    const{rover, camera, year,month,day} =context
    useImperativeHandle(ref, () => ({getData}));
    async function getData() {
      dispatch({type:'startFetching'})
      const photos=await getPhotos(1,rover, camera, year,month,day)
      console.log(photos.length)
      if(photos.length>0){
        dispatch({type:'stopFetching',payload:photos})
      }
      else{
        //no photos for this date
        console.log('here')
        dispatch({type:"noPhotosAvailable"})
      }
      
    }
    const fetchdata = async():Promise<void>=>{
      
      let newphotos = await getPhotos(state.page,rover, camera, year,month,day)
      //dispatch({type:'getMoreData',payload:[...newphotos]})
      setPage(page=>page+1)
      setPhotos(photos=>[...photos, ...newphotos])
    }
    return(
        <View style={{backgroundColor:"#fff", flex:1}}>
        <ScrollView 
        onScroll={async ({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent) && !state.loading && !state.na) {
            console.log('close to bottom')
            if(!state.end){
              dispatch({type:'startFetching'})
              let newPhotos=await getPhotos(state.page,rover, camera, year,month,day)
                // console.log(state.photos.length)
                // console.log(state.page)
              if(newPhotos.length===0){
                dispatch({type:'endOfData',payload:newPhotos})
              }else{
                dispatch({type:'getMoreData',payload:newPhotos})
              }
            }
            
          }
        }}
         style={styles.container}>
          {state.photos.map(({cam, url},idx)=>{
            return <Photo handleClick={()=>{
              dispatch({type:'clicked', id:idx})
            }} camera={cam} key={idx} url={url}/>
          })}
          {/* <Button onPress = {fetchdata}>get photos</Button> */}
          {state.na?<View style={styles.na}><Text style={{color:'#6200ee', fontSize:18}}>NO PHOTOS FOR THIS DATE </Text></View>:<View></View>}
          {state.end?<View style={styles.endOfResults}><Text style={styles.purple} >end of results</Text></View>:<Text></Text>}
          <View><ActivityIndicator size={30} animating={state.loading && state.end==false} color='#6200ee' /></View>
          <PhotosViewV2 idx={state.idx} clickedFromOutside={state.clicked} data={state.photos}/>
        </ScrollView>
        </View>
          
        );
  });


  const styles = StyleSheet.create({
    container: {
      
      position:'relative',
      
      backgroundColor:"#fff"
    },
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    endOfResults: {
      flex:1,
      //flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    },
    purple:{
      color: '#6200ee'
    },
    na:{
      //color:'#6200ee',
      //paddingLeft:90,
      flex:1,
      //height:'20%',
      justifyContent:'center',
      alignItems:'center'
    }
  });
