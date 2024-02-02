import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Obavestenje = new Schema({
    naziv:{
        type:String
    },
    datumCasa:{
        type:Object
    },
    datumObavestenja:{
        type:Object
    },
    nastavnik:{
        type:String
    },
    ucenik:{
        type:String
    },
    obrazlozenje:{
        type:String
    },
    novo:{
        type:Boolean
    }
})

export default mongoose.model('ObavestenjeModel', Obavestenje, 'obavestenje')