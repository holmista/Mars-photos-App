// import {theContext} from '../components/PhotosConfigPage'
// import * as _ from 'lodash'
//import {PhotosView} from '../components/PhotosView'
//console.log(theContext)
// export const Context = theContext
//console.log(Context===theContext)
//export const PhotoSView = PhotosView
//console.log(PhotoSView)
//console.log(PhotosView)
//export default Context
import {createContext} from 'react'

interface Value{
    rover:string;
    year:string;
    month:string;
    camera:string;
    day:string;
}

let defaultValues:Value={
    rover:'',
    year:'',
    month:'',
    camera:'',
    day:''
}
export const theContext = createContext(defaultValues)