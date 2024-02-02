import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Cas = new Schema({
    ucenik:{
        type:String
    },
    predmet:{
        type:String
    },
    nastavnik:{
        type:String
    },
    imeUcenika:{
        type:String
    },
    prezimeUcenika:{
        type:String
    },
    datum:{
        type:Object
    },
    opis:{
        type:String
    },
    obrazlozenje:{
        type:String
    },
    komentarUcenik:{
        type:String
    },
    ocenaUcenik:{
        type:Number
    },
    komentarNastavnik:{
        type:String
    },
    ocenaNastavnik:{
        type:Number
    },
    trajanje:{
        type:Number
    },
    potvrdjen:{
        type:Boolean
    }
})

export default mongoose.model('CasModel', Cas, 'cas')