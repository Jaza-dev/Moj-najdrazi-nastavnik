import express from 'express'
import NastavnikModel from '../models/nastavnik'
import CasModel from '../models/cas'
import UcenikModel from '../models/ucenik'
import AdminModel from '../models/admin'
import PredmetModel from '../models/predmet'
import ObavestenjeModel from '../models/obavestenje'

export class NastavnikController{

    prijava = (req:express.Request, res:express.Response)=>{

        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        NastavnikModel.findOne({'korisnickoIme':korisnickoIme, 'lozinka':lozinka})
            .then((resp)=>res.json({"poruka":resp}))
            .catch((err)=>res.json({"poruka":err}))
    
    }

    dohvatiSveOdobrenePredmete  = async (req:express.Request, res:express.Response) => {

        let odobreniPredmeti = await PredmetModel.find({"odobren":true});

        res.json({"poruka":odobreniPredmeti});

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

        nastavnik = new NastavnikModel(req.body);
        nastavnik.save()
        .then((resp)=>{
            res.json(resp)
        })

    }

    kreirajZahtevZaNoviPredmet = async (req:express.Request, res:express.Response) => { 
        let ime = req.body.noviPredmet;
        let odobren = false;

        new PredmetModel({
            ime:ime,
            odobren:odobren,
            prikazi:true
        }).save();

        res.json({"poruka":"ok"})
    }

    brojNastavnika = async (req:express.Request, res:express.Response) => {

        let brojNastavnika = await NastavnikModel.countDocuments({'aktivan':true});
        res.json({"poruka":brojNastavnika})

    }

    dohvatiSvePredmeteINastavnike = async (req:express.Request, res:express.Response) => {

        // lista predmeta i nastavnika
        let listaPredmetaINastavnika: any[] = [];

        let nastavnici = await NastavnikModel.find({"aktivan":true});

        let predmeti = await PredmetModel.find({"odobren":true});
        predmeti.forEach((predmet)=>{
            listaPredmetaINastavnika.push({
                predmet:predmet.ime,
                nastavnici:[]
            })
        })

        nastavnici.forEach((nastavnik) => {
            nastavnik.predmeti.forEach((predmet) => {
                let predmetExists = listaPredmetaINastavnika.find((item) => item.predmet === predmet);
                predmetExists.nastavnici.push(nastavnik);
            });
        });

        res.json({ "poruka": listaPredmetaINastavnika });
    }

    dohvatiOdredjenePredmeteINastavnike = async (req:express.Request, res:express.Response) => {

        let uzrast = req.body.uzrast;
        // lista predmeta i nastavnika
        let listaPredmetaINastavnika: any[] = [];

        let nastavnici = await NastavnikModel.find({"aktivan":true});

        nastavnici.forEach((nastavnik) => {
            if(nastavnik.uzrast.includes(uzrast)){
                nastavnik.predmeti.forEach((predmet) => {
                    // provjeri da li predmet već postoji u listi
                    let predmetExists = listaPredmetaINastavnika.find((item) => item.predmet === predmet);
    
                    if (predmetExists) {
                        // ako predmet već postoji, dodaj nastavnika u postojeću listu
                        predmetExists.nastavnici.push(nastavnik);
                    } else {
                    // ako predmet ne postoji, dodaj novi predmet i nastavnika u listu
                    listaPredmetaINastavnika.push({
                        predmet: predmet,
                        nastavnici: [nastavnik]
                    });
                    }
                });
            }
            
        });

        res.json({ "poruka": listaPredmetaINastavnika });
    }


    pretraziNastavnika = async (req:express.Request, res:express.Response) => {

        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let predmet = req.body.predmet;
        let uzrastFilter = req.body.uzrast;
        let nastavnik:any = [];

        if(uzrastFilter!==null){
            if (ime !== null && prezime !== null && predmet !== null) {

                nastavnik = await NastavnikModel.find({'ime':ime, 'prezime':prezime, "aktivan":true, uzrast:{$in:[uzrastFilter]} , predmeti:{$in:[predmet]}});
    
            } else if (ime !== null && prezime !== null && predmet === null) {
    
                nastavnik = await NastavnikModel.find({'ime':ime, "aktivan":true, 'prezime':prezime, uzrast:{$in:[uzrastFilter]} });
    
            } else if (ime !== null && prezime === null && predmet !== null) {
    
                nastavnik = await NastavnikModel.find({'ime':ime, "aktivan":true, uzrast:{$in:[uzrastFilter]} , predmeti:{$in:[predmet]}});
    
            } else if (ime !== null && prezime === null && predmet === null) {
    
                nastavnik = await NastavnikModel.find({'ime':ime, "aktivan":true, uzrast:{$in:[uzrastFilter]} });
    
            } else if (ime === null && prezime !== null && predmet !== null) {
    
                nastavnik = await NastavnikModel.find({'prezime':prezime, "aktivan":true, uzrast:{$in:[uzrastFilter]} , predmeti:{$in:[predmet]}});
    
            } else if (ime === null && prezime !== null && predmet === null) {
    
                nastavnik = await NastavnikModel.find({'prezime':prezime, "aktivan":true, uzrast:{$in:[uzrastFilter]} });
    
            } else if (ime === null && prezime === null && predmet !== null) {
    
                nastavnik = await NastavnikModel.find({"aktivan":true, uzrast:{$in:[uzrastFilter]} ,predmeti:{$in:[predmet]}});
    
            }
        }else{
            if (ime !== null && prezime !== null && predmet !== null) {

                nastavnik = await NastavnikModel.find({'ime':ime, 'prezime':prezime, "aktivan":true,predmeti:{$in:[predmet]}});
    
            } else if (ime !== null && prezime !== null && predmet === null) {
    
                nastavnik = await NastavnikModel.find({'ime':ime, "aktivan":true, 'prezime':prezime});
    
            } else if (ime !== null && prezime === null && predmet !== null) {
    
                nastavnik = await NastavnikModel.find({'ime':ime, "aktivan":true, predmeti:{$in:[predmet]}});
    
            } else if (ime !== null && prezime === null && predmet === null) {
    
                nastavnik = await NastavnikModel.find({'ime':ime, "aktivan":true});
    
            } else if (ime === null && prezime !== null && predmet !== null) {
    
                nastavnik = await NastavnikModel.find({'prezime':prezime, "aktivan":true, predmeti:{$in:[predmet]}});
    
            } else if (ime === null && prezime !== null && predmet === null) {
    
                nastavnik = await NastavnikModel.find({'prezime':prezime, "aktivan":true});
    
            } else if (ime === null && prezime === null && predmet !== null) {
    
                nastavnik = await NastavnikModel.find({"aktivan":true,predmeti:{$in:[predmet]}});
    
            }
        }
        
        res.json({"poruka":nastavnik})

    }

    azurirajPodatke = async (req:express.Request, res:express.Response) => {
        
        let nastavnik = req.body;

        NastavnikModel.updateOne({'korisnickoIme':nastavnik.korisnickoIme}, {$set:{
            'ime':nastavnik.ime,
            'prezime':nastavnik.prezime,
            'adresa':nastavnik.adresa,
            'email':nastavnik.email,
            'telefon':nastavnik.telefon,
            'slika':nastavnik.slika,
            'predmeti':nastavnik.predmeti,
            'uzrast':nastavnik.uzrast
        }}).then((resp)=>{res.json({'poruka':'Uspesno izmenjeni podaci.'})})

    }
    
    dohvatiMojeUcenike = async (req:express.Request, res:express.Response) => {

        let nastavnik = req.body.nastavnik;
        let danasnjiDatum = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);

        //lista [{"ucenik1":[Cas1, Cas2, Cas3]}, {"ucenik2":[Cas4,Cas5]}]
        let listaCasova:any[]  = [];
        let casovi = await CasModel.find({"nastavnik":nastavnik});

        casovi.forEach((cas:any) => {
            if(cas.datum < danasnjiDatum){
                let ucenikPostoji = listaCasova.find((item) => item.ucenik === cas.ucenik);

                if (ucenikPostoji) {
                    // ako predmet već postoji, dodaj nastavnika u postojeću listu
                    ucenikPostoji.casovi.push(cas);
                } else {
                    // ako predmet ne postoji, dodaj novi predmet i nastavnika u listu
                    listaCasova.push({
                        ucenik: cas.ucenik,
                        casovi: [cas]
                    }); 
                }
            }

            
        });

        res.json({"poruka":listaCasova})
    }

    dohvatiPetPrvihPotvrdjenihCasova = async (req:express.Request, res:express.Response) => {

        let nastavnik = req.body.nastavnik;

        const danasnjiDan = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        const zaTriDana = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        zaTriDana.setDate(zaTriDana.getDate() + 3);

        const query = {"nastavnik":nastavnik, "potvrdjen":true, datum: { $gte: danasnjiDan, $lte: zaTriDana } };

        let casoviUProteklaTriDana = await CasModel.find(query);

        casoviUProteklaTriDana.sort((a:any,b:any):any=>{
            if(a.datum < b.datum) return -1;
            else return 1
        })

        res.json({"poruka":casoviUProteklaTriDana.slice(0,5)});

    }

    dohvatiDesetPrvihPotvrdjenihCasova = async (req:express.Request, res:express.Response) => {

        let nastavnik = req.body.nastavnik;

        const danasnjiDan = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        const zaTriDana = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        zaTriDana.setDate(zaTriDana.getDate() + 3);

        const query = {"nastavnik":nastavnik, "potvrdjen":true, datum: { $gte: danasnjiDan, $lte: zaTriDana } };

        let casoviUProteklaTriDana = await CasModel.find(query);

        casoviUProteklaTriDana.sort((a:any,b:any):any=>{
            if(a.datum < b.datum) return -1;
            else return 1
        })

        res.json({"poruka":casoviUProteklaTriDana.slice(0,10)});

    }

    dohvatiSvePotvrdjeneCasove = async (req:express.Request, res:express.Response) => {

        let nastavnik = req.body.nastavnik;

        const danasnjiDan = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        const zaTriDana = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        zaTriDana.setDate(zaTriDana.getDate() + 3);

        const query = {"nastavnik":nastavnik, "potvrdjen":true, datum: { $gte: danasnjiDan, $lte: zaTriDana } };

        let casoviUProteklaTriDana = await CasModel.find(query);

        casoviUProteklaTriDana.sort((a:any,b:any):any=>{
            if(a.datum < b.datum) return -1;
            else return 1
        })

        res.json({"poruka":casoviUProteklaTriDana});

    }

    dohvatiListuZahteva = async (req:express.Request, res:express.Response) => {

        let nastavnik = req.body.nastavnik;
        const danasnjiDan = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);

        let listaZahteva = await CasModel.find({"nastavnik":nastavnik, "potvrdjen":false, "obrazlozenje":"", datum: { $gte: danasnjiDan } });
        
        res.json({"poruka":listaZahteva});

    }

    potvrdi = async (req:express.Request, res:express.Response) => {

        let id = req.body.id;

        await CasModel.updateOne({'_id': id}, {$set: {'potvrdjen': true}});

        let cas = await CasModel.findOne({'_id':id});

        if(cas !== null){
            let obavestenje = new ObavestenjeModel({
                "naziv":"Potvdjen cas",
                "datumCasa":cas.datum,
                "datumObavestenja": new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000),
                "nastavnik":cas.nastavnik,
                "ucenik":cas.ucenik,
                "obrazlozenje":"Cas koji ste zakazali je potvrdjen.",
                "novo":true
            })
            obavestenje.save().then();
        }

        res.json({"poruka":"Cas uspesno potvrdjen."})
    }

    odbij = async (req:express.Request, res:express.Response) => {
        
        let id = req.body.id;

        await CasModel.updateOne({'_id': id}, {$set: {'obrazlozenje': req.body.obrazlozenje}});

        let cas = await CasModel.findOne({'_id':id});

        if(cas !== null){
            let obavestenje = new ObavestenjeModel({
                "naziv":"Odbijen cas",
                "datumCasa":cas.datum,
                "datumObavestenja":new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000),
                "nastavnik":cas.nastavnik,
                "ucenik":cas.ucenik,
                "obrazlozenje":req.body.obrazlozenje,
                "novo":true
            })
            obavestenje.save().then();
        }

        res.json({"poruka":"Cas uspesno odbijen."})
    }

    ostaviOcenuIKomentar = async (req:express.Request, res:express.Response) => { 
        let _id = req.body._id;
        let komentar = req.body.komentar;
        let ocena = req.body.ocena;
        
        //upis komentara i ocene
        await CasModel.updateOne({'_id': _id}, {$set: {'komentarNastavnik': komentar, 'ocenaNastavnik':ocena}});
    
        //racunanje nove prosecne ocene ucenika
        let cas = await CasModel.findOne({"_id":_id});

        if(cas !== null){
            let casoviUcenika = await CasModel.find({"ucenik":cas.ucenik, "ocenaNastavnik":{$ne:0}});
            let prosecnaOcena = 0;
            let brojOcena = 0;
            casoviUcenika.forEach((cas)=>{
                if(cas.ocenaNastavnik !== undefined && cas.ocenaNastavnik !== null){
                    prosecnaOcena += cas.ocenaNastavnik;
                    brojOcena++;
                }
            })

            //upisujem prosecnu ocenu samo ako ima 3 ili vise unetih ocena
            if(brojOcena >= 3)
                prosecnaOcena = Number((prosecnaOcena/brojOcena).toFixed(1))
            else
                prosecnaOcena = 0;
            await UcenikModel.updateOne({'korisnickoIme': cas.ucenik}, {$set: {'prosecnaOcena': prosecnaOcena}});
        }

        res.json({"poruka":"Uspesno ste ostavili ocenu."})
    }

    dohvatiProsecneOcene = async (req:express.Request, res:express.Response) => {
        
        let listaZahteva = req.body.listaZahteva
        let prosecneOcene = [];
        for(let i = 0; i < listaZahteva.length; i++){
            let ucenik = await UcenikModel.findOne({"korisnickoIme":listaZahteva[i].ucenik});
            prosecneOcene.push(ucenik?.prosecnaOcena);
        }
        res.json({"poruka":prosecneOcene})
    } 

    otkaziCas = async (req:express.Request, res:express.Response) => {
        
        let id = req.body.id;

        await CasModel.updateOne({'_id': id}, {$set: {'obrazlozenje': req.body.obrazlozenje, 'potvrdjen':false}});

        let cas = await CasModel.findOne({'_id':id});

        if(cas !== null){
            let obavestenje = new ObavestenjeModel({
                "naziv":"Otkazan cas",
                "datumCasa":cas.datum,
                "datumObavestenja": new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000),
                "nastavnik":cas.nastavnik,
                "ucenik":cas.ucenik,
                "obrazlozenje":req.body.obrazlozenje,
                "novo":true
            })
            obavestenje.save().then();
        }


        res.json({"poruka":"Cas uspesno otkazan."})
    }

    
    dohvatiSveOdrzaneCasove  = async (req:express.Request, res:express.Response) => {

        let nastavnik = req.body.nastavnik;
        const danasnjiDan = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        
        let casovi = await CasModel.find({
            "nastavnik": nastavnik,
            "datum": { $lte: danasnjiDan },
            "potvrdjen": true,
            "komentarUcenik": { $ne: "" },
            "ocenaUcenik": { $ne: "" }
        });
          
        res.json({"poruka":casovi})
    } 
}