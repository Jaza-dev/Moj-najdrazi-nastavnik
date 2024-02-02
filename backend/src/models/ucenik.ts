import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Ucenik = new Schema({
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
    tipSkole:{
        type:String
    },
    razred:{
        type:Number
    },
    prosecnaOcena:{
        type:Number
    },
})

export default mongoose.model('UcenikModel', Ucenik, 'ucenik')