import { Modal, View, Button, Text } from 'react-native';
import React,{ useState,useEffect, forwardRef } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import getPhotos from '../utils/getPhotos'
import axios from 'axios'
import { Props } from 'react-native-paper/lib/typescript/components/RadioButton/RadioButton';

interface Image{
    url:string;
    props:{}
}
type Images = Array<Image>
 
export const PhotosViewV2:React.FC<{data:Array<{url:string, cam:string}>, clickedFromOutside:number,idx:number}>=({data,clickedFromOutside,idx})=> {
    const[images, setImages]=useState<Images>([])
    const[visible, setVisible]=useState(false)
    const getData = async():Promise<void>=>{
        let images=data.map((elem)=>{return {url:elem.url, props:{}}})
        setImages(images)
        
    }
    
    useEffect(()=>{
        if(clickedFromOutside){
            setVisible(true)
        }
        getData()
    },[clickedFromOutside])
    return (
            <Modal  visible={visible} transparent={true}>
                <ImageViewer index={idx}  imageUrls={images} onClick={()=>(setVisible(false))}/>
            </Modal>
    )
}