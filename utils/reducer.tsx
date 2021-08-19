interface State{
    camerasVisisble:boolean;
    yearVisible:boolean;
    monthVisible:boolean;
    dayVisible:boolean;
    cameraName:string;
    year:string;
    month:string;
    day:string;
}

interface Action{
    type:string
    payload?:string
}



export const reducer = (state:State, action:Action) => {
    switch (action.type) {
      case 'showCameras':
        return {
          ...state,
          camerasVisisble:true
        }
      case 'showYear':
        return {
          ...state,
          yearVisible:true
        }
      case 'showMonth':
        return {
          ...state,
          monthVisible:true
        }
      case 'showDay':
        return {
          ...state,
          dayVisible:true
        }
      case 'closeCameras':
        return {
          ...state,
          camerasVisisble:false
        }
      case 'closeYear':
        return {
          ...state,
          yearVisible:false
        }
      case 'closeMonth':
        return {
          ...state,
          monthVisible:false
        }
      case 'closeDay':
        return {
          ...state,
          dayVisible:false
        }
      case 'cameraClicked':
        return {
          ...state,
          camerasVisisble:false,
          cameraName:action.payload as string
        }
      case 'yearClicked':
        return {
          ...state,
          month:state.month=='month'?'month':'1',
          day:state.day=='day'?'day':'1',
          yearVisible:false,
          year:action.payload as string
        }
      case 'monthClicked':
        return {
          ...state,
          day:state.day=='day'?'day':'1',
          monthVisible:false,
          month:action.payload as string
        }
      case 'dayClicked':
        return {
          ...state,
          dayVisible:false,
          day:action.payload as string
        }
      default: return state
     }
  }

interface Image{
  cam:string
  url:string
}

interface ACtion{
  type:string,
  payload?:Image[],
  id?:number
}

interface phState{
  photos:Array<Image>,
  page:number,
  end:boolean,
  loading:boolean,
  clicked:number,
  idx:number,
  na:boolean
}

export const photosViewReducer=(state:phState,action:ACtion):phState=>{
  switch(action.type){
    case 'startFetching':
      return {...state, loading:true,na:false,}
    case 'stopFetching':
      return{
        ...state,
        loading:false,
        end:false,
        na:false,
        page:2,
        photos:action.payload as Array<Image>
      }
    case 'endOfData':
      return{
        ...state,
        loading:false,
        end:true,
        na:false,
        page:1,
        photos:[...state.photos, ...action.payload as Array<Image>]
      }
    case 'noPhotosAvailable':
      return{
        ...state,
        photos:[],
        end:false,
        na:true,
        loading:false
      }
    case 'getMoreData':
      return{
        ...state,
        loading:false,
        end:false,
        na:false,
        page:state.page+1,
        photos:[...state.photos, ...action.payload as Array<Image>] as Array<Image>
      }
    case 'clicked':
      return{
        ...state,
        idx:action.id as number,
        na:false,
        clicked:state.clicked+1
      }
    default:return {...state}
  }
}