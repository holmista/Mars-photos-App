import axios from 'axios'
import * as _ from 'lodash'


interface Photo {
    img_src: string;
    camera:{
        name:string
    }
}

interface Response {
    data: {
        photos: Photo[];
    }
}
interface response {
    photos: Photo[];
}
export default async function getPhotos(page:number,rover:string,camera:string, year:string, month:string, day:string){
    const url=`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${year}-${month}-${day}&camera=${camera}&page=${page}&api_key=bbGdxuUzhkudK1sqOe2ryXuUEDpTJIpcQrHdadFv`
    let res = await axios.get<response>(url)
    let images = res.data.photos
    const photos=images.map((elem)=>{return{cam:elem.camera.name as string,url:elem.img_src as string}})
    return photos
}