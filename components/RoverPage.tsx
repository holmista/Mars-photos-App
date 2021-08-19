import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useHistory, useRouteMatch} from "react-router-native";
import { BackHandler } from 'react-native';
import useGoBack from "../utils/useGoBack"
import DefaultNavbar from './DefaultNavbar'
import {Button} from 'react-native-paper'
import GoBackButton from './GoBackButton'

const RoverPage=({route, navigation}:any)=> {
  
  return (
    <View style={{flex:1,justifyContent:"center",backgroundColor:'#fff'}}>
      
      <View style={styles.goback}>
        <GoBackButton navigation={navigation}/>
      </View> 
      <View style={{flex:1,justifyContent:'center', alignItems:"center",paddingBottom:'70%', width:"100%", backgroundColor:'#fff'}}>
        <Text style={styles.text}>{route.params.roverName}</Text>
        <View style={styles.container}>
          <Button style={styles.button} mode='contained' onPress={()=>{
              navigation.navigate('InfoPage', {roverName:route.params.roverName})
            }}>info</Button>
          <Button style={styles.button} mode='contained' onPress={()=>{
            console.log('here')
              navigation.navigate('PhotosConfig', {roverName:route.params.roverName})
            }}>Photos</Button>
          {/* <View>
            <DefaultNavbar/>
          </View> */}
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    marginBottom:20,
    width:150
  },
  text:{
    color:'#6200ee',
    fontSize:20,
    fontWeight:'bold',
    // paddingTop:100,
    textAlign:'center'
  },
  goback:{
    flex:1,
    alignItems:'flex-start',
    width:'20%',
    paddingTop:20

  }
});

export default RoverPage