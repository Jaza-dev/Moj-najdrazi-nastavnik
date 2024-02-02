import express from 'express'
import CasModel from '../models/cas'

export class CasController {

    kreirajCas = (req:express.Request, res:express.Response) => {
        
        let cas = new CasModel({
            "ucenik":req.body.ucenik,
            "nastavnik":req.body.nastavnik,
            "predmet":req.body.predmet,
            "imeUcenika":req.body.imeUcenika,
            "prezimeUcenika":req.body.prezimeUcenika,
            "datum": new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000),
            "opis":req.body.opis,
            "obrazlozenje":req.body.obrazlozenje,
            "komentarUcenik":req.body.komentarUcenik,
            "ocenaUcenik":req.body.ocenaUcenik,
            "komentarNastavnik":req.body.komentarNastavnik,
            "ocenaNastavnik":req.body.ocenaNastavnik,
            "trajanje":req.body.trajanje,
            "potvrdjen":false
        });
        cas.save()
        .then(
            (resp) => {
                res.json({"poruka":"Uspesno kreiran cas."})
            }
        )

    }

    brojOdrzanihCasovaNedelja = async (req:express.Request, res:express.Response) => {

        const startDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        const danas = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        startDate.setDate(startDate.getDate() - 7);

        const query = {"potvrdjen":true, datum: { $gte: startDate, $lte: danas } };

        let count = await CasModel.countDocuments(query);

        res.json({"poruka":count});
        
    }

    brojOdrzanihCasovaMesec = async (req:express.Request, res:express.Response) => {

        const startDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        const danas = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        startDate.setMonth(startDate.getMonth() - 1);

        const query = {"potvrdjen":true,  datum: { $gte: startDate, $lte: danas } };

        let count = await CasModel.countDocuments(query);

        res.json({"poruka":count});
        
    }


}