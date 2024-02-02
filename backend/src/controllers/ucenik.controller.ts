import express from 'express'
import NastavnikModel from '../models/nastavnik'
import CasModel from '../models/cas'
import UcenikModel from '../models/ucenik'
import AdminModel from '../models/admin'

import ObavestenjeModel from '../models/obavestenje'

export class UcenikController{

    prijava = (req:express.Request, res:express.Response)=>{

        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        UcenikModel.findOne({'korisnickoIme':korisnickoIme, 'lozinka':lozinka})
            .then((resp)=>res.json({"poruka":resp}))
            .catch((err)=>res.json({"poruka":err}))
    
    }

    registracija = async (req:express.Request, res:express.Response) => {

        let nastavnik = await NastavnikModel.findOne({"korisnickoIme":req.body.korisnickoIme});
        let ucenik = await UcenikModel.findOne({"korisnickoIme":req.body.korisnickoIme});
        let admin = await AdminModel.findOne({"korisnickoIme":req.body.korisnickoIme});

        if(nastavnik!==null || ucenik!==null || admin!==null){
            res.json({"poruka":"Korisnink sa tim korisnickim imenom vec postoji."})
            return;
        }

        nastavnik = await NastavnikModel.findOne({"email":req.body.email})
        ucenik = await UcenikModel.findOne({"email":req.body.email});
        admin = await AdminModel.findOne({"email":req.body.email});

        if(nastavnik!==null || ucenik!==null || admin!==null){
            res.json({"poruka":"Korisnink sa tom e-mail adresom vec postoji."})
            return;
        }

        ucenik = new UcenikModel(req.body);
        ucenik.save()
        .then((resp)=>{
            res.json({"poruka":resp})
        })
    }

    brojUcenika = async (req:express.Request, res:express.Response) => {
        
        let brojUcenika = await UcenikModel.countDocuments();
        res.json({"poruka":brojUcenika});
    }

    azurirajPodatke = async (req:express.Request, res:express.Response) => {
        
        let ucenik = req.body.ucenik;

        UcenikModel.updateOne({'korisnickoIme':ucenik.korisnickoIme}, {$set:{
            'ime':ucenik.ime,
            'prezime':ucenik.prezime,
            'adresa':ucenik.adresa,
            'email':ucenik.email,
            'telefon':ucenik.telefon,
            'slika':ucenik.slika,
            'tipSkole':ucenik.tipSkole,
            'razred':Number(ucenik.razred)
        }}).then((resp)=>{res.json({'poruka':'Uspesno izmenjeni podaci.'})})

    }

    odrzaniCasovi = async (req:express.Request, res:express.Response) => {

        let ucenik = req.body.ucenik;
        const danasnjiDan = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        
        let casovi = await CasModel.find({"ucenik":ucenik, "potvrdjen":true ,datum:{$lte: danasnjiDan}})

        res.json({"poruka":casovi})

    }

    predstojeciCasovi = async (req:express.Request, res:express.Response) => {
        
        let ucenik = req.body.ucenik;
        const danasnjiDan = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        
        let casovi = await CasModel.find({"ucenik":ucenik, "potvrdjen":true , datum:{$gte: danasnjiDan}})

        res.json({"poruka":casovi})
    }

    
    zakaziCasPutemForme = async (req:express.Request, res:express.Response) => {
        let ucenik = req.body.ucenik;
        let nastavnik = req.body.nastavnik;
        let predmet = req.body.predmet;
        let imeUcenika = req.body.imeUcenika;
        let prezimeUcenika = req.body.prezimeUcenika;
        let datum = req.body.datum;
        let opis = req.body.opis;
        let trajanje = req.body.trajanje;
        let poruka:string = "";

        let danasnjiDan = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);

        let casPocetka = new Date(datum)
        casPocetka.setHours(casPocetka.getHours() + 1);

        let casKraja = new Date(datum)
        casKraja.setHours(casKraja.getHours() + trajanje + 1)


        let zakazaniCasovi = await CasModel.find({"nastavnik":nastavnik, "potvrdjen":true, datum:{$gte:danasnjiDan}})

        zakazaniCasovi.forEach((cas)=>{
            let casZakazanPocetak = cas.datum;
            let casZakazanKraj = new Date(cas.datum)
            casZakazanKraj.setHours(cas.datum.getHours() + cas.trajanje)

            if(
                (casPocetka >= casZakazanPocetak && casPocetka < casZakazanKraj) ||
                (casKraja > casZakazanPocetak && casKraja <= casZakazanKraj) ||
                (casZakazanPocetak >= casPocetka && casZakazanPocetak < casKraja) ||
                (casZakazanKraj > casPocetka && casZakazanKraj <= casKraja)
            ){
                poruka = "Vec postoji cas koji je zakazan u tom terminu. Pokusajte neki drugi termin."
            }
            
        })

        if(poruka === "") {
            
            let cas = new CasModel({
                "ucenik":ucenik,
                "nastavnik":nastavnik,
                "predmet":predmet,
                "imeUcenika":imeUcenika,
                "prezimeUcenika":prezimeUcenika,
                "datum":casPocetka,
                "opis":opis,
                "obrazlozenje":"",
                "komentarUcenik":"",
                "ocenaUcenik":0,
                "komentarNastavnik":"",
                "ocenaNastavnik":0,
                "trajanje":trajanje,
                "potvrdjen":false
            });
            cas.save()
            .then()
            poruka = "Uspesno ste zakazali cas.";

        }
        res.json({"poruka":poruka})
    }

    ostaviOcenuIKomentar = async (req:express.Request, res:express.Response) => { 

        let _id = req.body._id;
        let komentar = req.body.komentar;
        let ocena = req.body.ocena;

        
        //upis komentara i ocene
        await CasModel.updateOne({'_id': _id}, {$set: {'komentarUcenik': komentar, 'ocenaUcenik':ocena}});
        

        //racunanje nove prosecne ocene nastavnika
        let cas = await CasModel.findOne({"_id":_id});
        if(cas !== null){
            let casoviNastavnika = await CasModel.find({"nastavnik":cas.nastavnik, "ocenaUcenik":{$ne:0}});
            let prosecnaOcena = 0;
            let brojOcena = 0;
            casoviNastavnika.forEach((cas)=>{
                if(cas.ocenaUcenik !== undefined && cas.ocenaUcenik !== null){
                    prosecnaOcena += cas.ocenaUcenik;
                    brojOcena++;
                }
            })
            prosecnaOcena = Number((prosecnaOcena/brojOcena).toFixed(1))
            await NastavnikModel.updateOne({'korisnickoIme': cas.nastavnik}, {$set: {'prosecnaOcena': prosecnaOcena}});
        }

        res.json({"poruka":"Uspesno ste ostavili ocenu."});
    }

    dohvatiSvaObavestenja  = async (req:express.Request, res:express.Response) => { 
        let ucenik = req.body.ucenik;
        let obavestenja = await ObavestenjeModel.find({'ucenik':ucenik});

        //nova obavestenja su sada stara
        await ObavestenjeModel.updateMany({'ucenik':ucenik,'novo':true}, { $set: { novo: false } });

        res.json({"poruka":obavestenja});
    }



}