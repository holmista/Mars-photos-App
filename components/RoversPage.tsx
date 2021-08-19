import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Button, Text} from 'react-native-paper'
import { StyleSheet, View, TouchableOpacity, Clipboard } from 'react-native';
import RoverPage from './RoverPage'

const RoversPage=({navigation}:any)=> {
  
  return (
    <View style={styles.container}>
      
      <View style={styles.container}>
        <Button style={styles.button} mode='contained' onPress={()=>navigation.navigate('RoverPage', {roverName:'Curiosity'})}>Curiosity</Button>
        <Button style={styles.button} mode='contained' onPress={()=>navigation.navigate('RoverPage',{roverName:'Opportunity'})}>Opportunity</Button>
        <Button style={styles.button} mode='contained' onPress={()=>navigation.navigate('RoverPage',{roverName:'Spirit'})}>Spirit</Button>
      </View>
      <View style={styles.bugs}>
          {/* <Text>report bugs :</Text> */}
          <Text selectable selectionColor='#999ca1'>report bugs : tornike.buchukuri.314@gmail.com</Text>
          
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
    width:'100%',
    height:'90%'
  },
  text:{
    color:'#6200ee',
    fontSize:20,
    fontWeight:'bold',
    paddingTop:100
  },
  button:{
    marginBottom:20,
    width:150
  },
  bugs:{
    paddingBottom:'10%'
  }
});

export default RoversPage