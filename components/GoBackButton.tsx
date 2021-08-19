import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
export default function GoBackButton({navigation}:any) {
    
    const goback=():void=>{
        navigation.goBack()
    }
    return (
        <View style={{}}>
            <Button onPress={goback} labelStyle={{fontSize:26}} icon='arrow-left'> </Button>
        </View>
    )
}


