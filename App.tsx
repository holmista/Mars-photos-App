import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NativeRouter, Route, MemoryRouter} from "react-router-native";
import axios from 'axios'
import RoversPage from './components/RoversPage'
import RoverPage from './components/RoverPage'
import InfoPage from './components/InfoPage'
import PhotosConfigPage from './components/PhotosConfigPage'
import PhotosPage from './components/PhotosPage';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { DefaultTheme,Provider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#fff',
  },
};

const App=()=> {
  
  return (
    <Provider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen options={{headerShown:false}} name="Home" component={RoversPage}/>
        <Stack.Screen options={{headerShown:false}} name='RoverPage' component={RoverPage}/>
        <Stack.Screen options={{headerShown:false}} name='InfoPage' component={InfoPage}/>
        <Stack.Screen options={{headerShown:false}} name='PhotosConfig' component={PhotosConfigPage}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App