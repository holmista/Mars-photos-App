import React, {useState, useEffect, useReducer} from 'react'
import { StyleSheet, Text, ScrollView, View  } from 'react-native'
import {useRouteMatch, useHistory} from 'react-router-native'
import axios from 'axios'
import GoBackButton from './GoBackButton'
import { ActivityIndicator, Button} from 'react-native-paper';

export default function InfoPage({route, navigation}:any) {
    
    const[info, setInfo] = useState('')
    const getData = async(roverName:string):Promise<void> =>{
        let res = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=True&explaintext=True&titles=${route.params.roverName}_(rover)`)
        let pageID = Object.keys(res.data.query.pages)[0]
        let info = res.data.query.pages[pageID].extract
        setInfo(info)
    }
    
    useEffect(()=>{
        
        getData(route.params.roverName)
        
    }, [])
    return (
        
            <View style={{paddingTop:20, backgroundColor:"#fff"}}>
                <View style={styles.goback}>
                <GoBackButton navigation={navigation}/>
                </View>
                <View><ActivityIndicator size={30} animating={!info} color='#6200ee' /></View>
                <ScrollView style={styles.st}>
                    <Text style={styles.container}>{info}</Text>
                </ScrollView >
            </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        color:'#6200ee',
        paddingRight:10,
        paddingLeft:10,
        paddingBottom:80,
        fontSize:20,
        lineHeight:25,
        
      },
      goback:{
        paddingRight:290,
        
    
      },
      st:{
        //    paddingTop:50,
            paddingRight:10,
            paddingLeft:10,
            // paddingBottom:10,
            backgroundColor:"#fff"
      }
})
