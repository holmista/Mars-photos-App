import { useEffect } from "react";
import { BackHandler } from 'react-native';
import {useHistory} from 'react-router-native'
import { History, LocationState  } from 'history'
import { Text, View } from 'react-native'

export default function useGoBack(history:History){
    
    function handleBackButtonClick() {
        history.goBack();
        return true;
      }
    useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
    }, []);
    
}


