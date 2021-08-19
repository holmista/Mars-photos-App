import React from 'react'
import { View, Text } from 'react-native'
import {useRouteMatch} from 'react-router-native'
import axios from 'axios'

export default function PhotosPage() {
    const match = useRouteMatch()
    const {RoverName, camera, date}=match.params
    const getPhotos = async():Promise<void>=>{
        let res = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${RoverName}/photos?earth_date=${date}&camera=${camera}&api_key=bbGdxuUzhkudK1sqOe2ryXuUEDpTJIpcQrHdadFv`)
        console.log(res.data)
    }
    getPhotos()
    return (
        <View>
            <Text>photos here</Text>
        </View>
    )
}
