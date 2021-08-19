import React, {MenuHTMLAttributes, useReducer, useRef, createContext, useState, createRef} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Menu, Divider, Provider, DefaultTheme} from 'react-native-paper';
import {reducer} from '../utils/reducer' 
import {data} from '../utils/Data';
import {PhotosView} from '../components/PhotosView'
import * as _ from 'lodash'
import {theContext}from '../utils/ContextPlaceholder'
import GoBackButton from './GoBackButton'
interface RefObject {
    getData: () => void
}

export default function PhotosConfigPage({route, navigation}:any) {
    function daysInMonth (month:number, year:number) {
        return new Date(year, month, 0).getDate();
    }
    
    let roverName = route.params.roverName as keyof typeof data;
    let  Data =data[roverName]
    const ref = useRef<RefObject>(null);
    const initialState = {
        camerasVisisble: false,
        dateVisible: false,
        cameraName:'Camera',
        year:'year',
        month:'month',
        day:'day',
        yearVisible:false,
        monthVisible:false,
        dayVisible:false
      }
    //   {theme={{...DefaultTheme,colors:{...DefaultTheme.colors,background:'red'}}}
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        
            <Provider>
                <View style={styles.goback}><GoBackButton navigation={navigation}/></View>
                <View style={{height:'30%', backgroundColor:"#fff"}}>
                {/* <View style={styles.goback}><GoBackButton navigation={navigation}/></View> */}
                {/* <GoBackButton/> */}
                <View style={styles.camera}>
                    {/* <GoBackButton navigation={navigation}/> */}
                    <Menu
                    visible={state.camerasVisisble}
                    onDismiss={()=>dispatch({type:'closeCameras'})}
                    anchor={<Button style={{width:120}} onPress={()=>dispatch({type:'showCameras'})}>{state.cameraName}</Button>}>
                    {Data.cameras.map(elem=><Menu.Item style={{backgroundColor:'#fff'}} titleStyle={{color:'#6200ee'}} key={elem} onPress={() => dispatch({type:'cameraClicked', payload:`${elem}`})} title={elem} />)}
                    </Menu>
                </View>
                <View style={styles.ymd}>
                    
                    <Menu
                    visible={state.yearVisible}
                    onDismiss={()=>dispatch({type:'closeYear'})}
                    anchor={<Button onPress={()=>dispatch({type:'showYear'})}>{state.year}</Button>}>
                        {Data.years.map(elem=><Menu.Item key={elem} style={{backgroundColor:'#fff'}} titleStyle={{color:'#6200ee'}} onPress={() => dispatch({type:'yearClicked', payload:`${elem}`})} title={elem} />)}
                    </Menu>
                    <Menu
                    visible={state.monthVisible}
                    onDismiss={()=>dispatch({type:'closeMonth'})}
                    anchor={<Button disabled={state.year=='year'?true:false} onPress={()=>dispatch({type:'showMonth'})}>{state.month}</Button>}>
                        {Number(state.year)==Data.years[Data.years.length-1]?Data.exmonths.map(elem=><Menu.Item key={elem} style={{backgroundColor:'#fff'}} titleStyle={{color:'#6200ee'}} onPress={() => dispatch({type:'monthClicked', payload:`${elem}`})} title={elem} />):
                        _.range(1,13).map((elem:number)=><Menu.Item key={elem} style={{backgroundColor:'#fff'}} titleStyle={{color:'#6200ee'}} onPress={() => dispatch({type:'monthClicked', payload:`${elem}`})} title={elem} />)}
                    </Menu>
                    <Menu
                    visible={state.dayVisible}
                    onDismiss={()=>dispatch({type:'closeDay'})}
                    anchor={<Button disabled={state.month=='month'?true:false} onPress={()=>dispatch({type:'showDay'})}>{state.day}</Button>}>
                        {Number(state.year)==Data.years[Data.years.length-1]?Data.exdays.map(elem=><Menu.Item style={{backgroundColor:'#fff'}} titleStyle={{color:'#6200ee'}} key={elem} onPress={()=>dispatch({type:'dayClicked', payload:`${elem}`})} title={elem}/>):
                        _.range(1,daysInMonth(Number(state.month), Number(state.year))+1).map((elem:number)=><Menu.Item style={{backgroundColor:'#fff'}} titleStyle={{color:'#6200ee'}} key={elem} onPress={() => dispatch({type:'dayClicked', payload:`${elem}`})} title={elem} />)}
                    </Menu>
            </View>
            
            <View style={styles.button}>
                <Button style={{width:'50%'}} mode='contained' disabled={!(state.cameraName!=='Camera'&&state.year!=='year'&&state.month!=='month'&&state.day!=='day')}onPress={()=>{
                    if (ref.current) {
                        ref.current.getData();
                      }
                    }}>search</Button>
            </View>
            </View>
            <theContext.Provider value={
               { rover:roverName,
                year:state.year,
                month:state.month,
                camera:state.cameraName,
                day:state.day}
                }>
                <PhotosView  ref={ref}/>
                
            </theContext.Provider>
            {/* </View> */}
        </Provider>
   );
}

const styles = StyleSheet.create({
    camera:{
        paddingTop:10,
        paddingLeft:120,
        // paddingBottom:20,
        //flex:1,
        // alignItems:'center',
        backgroundColor:"#fff"
    },
    ymd:{
        
        flex:2,
        alignItems:'center',
        justifyContent:"space-between",
        flexDirection:'row',
        paddingHorizontal:50,
        backgroundColor:"#fff"
        // paddingTop:20,
        // flex:1,
        // alignItems:'center',
        // justifyContent:"space-between",
        // flexDirection:'row',
        // paddingHorizontal:50,
        // backgroundColor:"#fff"
    },
    button:{
        flex:2,
        justifyContent:"center",
        alignItems:"center",
        paddingTop:10,
        backgroundColor:"#fff",
        paddingBottom:35,
        width:"100%"
        // paddingTop:10,
        // paddingLeft:80,
        // backgroundColor:"#fff",
        // paddingBottom:35,
       
    },
    goback:{
        flex:0.1,
        alignItems:'flex-start',
        width:'100%',
        paddingTop:20,
        backgroundColor:"#fff"
      }
})
