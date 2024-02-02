import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Nastavnik = new Schema({
    korisnickoIme:{
        type:String
    },
    lozinka:{
        type:String
    },
    pitanje:{
        type:String
    },
    odgovor:{
        type:String
    },
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    pol:{
        type:String
    },
    adresa:{
        type:String
    },
    telefon:{
        type:String
    },
    email:{
        type:String
    },
    slika:{
        type:String
    },
    cv:{
        type:String
    },
    predmeti:{
        type:Array
    },
    uzrast:{
        type:Array
    },
    odakleCuo:{
        type:String
    },
    prosecnaOcena:{
        type:Number
    },
    aktivan:{
        type:Boolean
    },
    odbijen:{
        type:Boolean
    }
})

export default mongoose.model('NastavnikModel', Nastavnik, 'nastavnik')