import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Predmet = new Schema({
    ime:{
        type:String
    },
    odobren:{
        type:Boolean
    },
    prikazi:{
        type:Boolean
    }
})

export default mongoose.model('PredmetModel', Predmet, 'predmet')