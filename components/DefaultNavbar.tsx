import React, {ReactElement, useState} from 'react'
import { View, Text } from 'react-native'
import {Redirect } from 'react-router-native'
import {Button} from 'react-native-paper'

export default function DefaultNavbar() {
    const[clicked, setClicked] = useState(false)
    
    if(clicked){
        return <Redirect to = '/'/>
    }
    return (
        <View>
            <Button mode='contained' onPress={()=>setClicked(true)}>Rovers</Button>
        </View>
    )
}
