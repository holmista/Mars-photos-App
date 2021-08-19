const _ = require('lodash')

type Cameras=string[];
    
type Years=number[];

type ExtremeMonths=number[];

type ExtremeDays=number[];


interface Rover{
    cameras:Cameras
    years:Years
    exmonths:ExtremeMonths
    exdays:ExtremeDays
}

interface Data{
    Curiosity:Rover,
    Opportunity:Rover,
    Spirit:Rover
}

export const data:Data={
    Curiosity:{cameras:["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"], years:_.range(2012, 2022), exmonths:_.range(1,9), exdays:_.range(1,4)},
    Opportunity:{cameras:["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"], years:_.range(2004, 2019), exmonths:_.range(1,7), exdays:_.range(1,10)},
    Spirit:{cameras:["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"], years:_.range(2004, 2011), exmonths:_.range(1,4), exdays:_.range(1,22)}
}

