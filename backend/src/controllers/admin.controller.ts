import express from 'express'
import AdminModel from '../models/admin'
import UcenikModel from '../models/ucenik'
import NastavnikModel from '../models/nastavnik'
import PredmetModel from '../models/predmet'
import CasModel from '../models/cas'

export class AdminController{

    prijava = async (req:express.Request, res:express.Response)=>{

        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        let admin = await AdminModel.findOne({'korisnickoIme':korisnickoIme, 'lozinka':lozinka});
        
        res.json({"poruka": admin})
    }

    dohvatiSveUcenike = async (req:express.Request, res:express.Response)=>{
        let sviUcenici = await UcenikModel.find({});

        res.json({"poruka":sviUcenici});
    }

    dohvatiSveNastavnike = async (req:express.Request, res:express.Response)=>{
        let sviNastavnici = await NastavnikModel.find({});

        res.json({"poruka":sviNastavnici});
    }

    dohvatiSveZahteve = async (req:express.Request, res:express.Response)=>{ 
        let zahtevi = await NastavnikModel.find({"aktivan":false, "odbijen":false});

        res.json({"poruka":zahtevi})
    }

    prihvatiZahtev = async (req:express.Request, res:express.Response)=>{ 
        let korisnickoIme = req.body.korisnickoIme;

        await NastavnikModel.updateOne({"korisnickoIme":korisnickoIme}, {"aktivan":true})

        res.json({"proruka":"Uspesno prihvacen zahtev."})
    }

    odbijZahtev  = async (req:express.Request, res:express.Response)=>{

        let korisnickoIme = req.body.korisnickoIme;

        await NastavnikModel.updateOne({"korisnickoIme":korisnickoIme}, {"odbijen":true})

        res.json({"proruka":"Uspesno odbijen zahtev."})
    }

    dohvatiSveNeodobrenePredmete = async (req:express.Request, res:express.Response)=>{

        let sviNeodobreniZahtevi = await PredmetModel.find({"odobren":false, "prikazi":true})

        res.json({"poruka":sviNeodobreniZahtevi})
    }

    odobriPredmet = async (req:express.Request, res:express.Response)=>{ 
        let _id = req.body._id;

        await PredmetModel.updateOne({"_id":_id}, {"odobren":true, "prikazi":false})

        res.json({"poruka":"Uspesno odobren predmet."})
    }

    odbijPredmet = async (req:express.Request, res:express.Response)=>{ 
        let _id = req.body._id;

        await PredmetModel.updateOne({"_id":_id}, {"prikazi":false, "odobren":false})

        res.json({"poruka":"Uspesno odbijen predmet."})
    }

    kreirajPredmet = async (req:express.Request, res:express.Response)=>{ 

        let ime = req.body.ime;

        let predmet = new PredmetModel({
            "ime":ime,
            "odobren":true,
            "prikazi":false,
        });
        predmet.save()
        .then(
            (resp) => {
                res.json({"poruka":"Uspesno kreiran predmet."})
            }
        )
    }

    dohvatiSveUzrasteINastavnike  = async (req:express.Request, res:express.Response)=>{ 

        let listaUzrastaINastavnika: any[] = [
            {
                uzrast:"osnovna skola 1-4. razred",
                nastavnici:[]
            },
            {
                uzrast:"osnovna skola 5-8. razred",
                nastavnici:[]
            },
            {
                uzrast:"srednja skola",
                nastavnici:[]
            },
        ];

        let nastavnici = await NastavnikModel.find({"aktivan":true});

        nastavnici.forEach((nastavnik) => {
            nastavnik.uzrast.forEach((uzrast) => {

                let uzrastPostoji = listaUzrastaINastavnika.find((item) => item.uzrast === uzrast);

                uzrastPostoji.nastavnici.push(nastavnik);
            });
        });

        res.json({ "poruka": listaUzrastaINastavnika });
    }

    dohvatiSvePoloveINastavnike = async (req:express.Request, res:express.Response)=>{ 

        let listaPolovaINastavnika: any[] = [
            {
                pol:"muski",
                nastavnici:[]
            },
            {
                pol:"zenski",
                nastavnici:[]
            }
        ];

        let nastavnici = await NastavnikModel.find({"aktivan":true});

        nastavnici.forEach((nastavnik) => {

            let polPostoji = listaPolovaINastavnika.find((item) => item.pol === nastavnik.pol);

            polPostoji.nastavnici.push(nastavnik);
        });

        res.json({ "poruka": listaPolovaINastavnika });
    }

    dohvatiSvePoloveIUcenike  = async (req:express.Request, res:express.Response)=>{ 

        let listaPolovaIUcenik: any[] = [
            {
                pol:"muski",
                ucenici:[]
            },
            {
                pol:"zenski",
                ucenici:[]
            },
        ];

        let ucenici = await UcenikModel.find({});

        ucenici.forEach((ucenik) => {

            let polPostoji = listaPolovaIUcenik.find((item) => item.pol === ucenik.pol);

            polPostoji.ucenici.push(ucenik);
        });

        res.json({ "poruka": listaPolovaIUcenik });
    }
    
    dohvatiSveCasovePoDanima = async (req:express.Request, res:express.Response)=>{ 

        const startDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        startDate.setFullYear(startDate.getFullYear() - 1);
        startDate.setMonth(0);
        startDate.setDate(1);
        const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        let casovi = await CasModel.find({"potvrdjen":true,  datum: { $gte: startDate, $lte: today } });
        let ukupanBrojCasova = casovi.length;

        let listaCasovaPoDanima: any[] = [
            {
                dan:"nedelja",
                casovi:[],
                prosecanBroj:0
            },
            {
                dan:"ponedeljak",
                casovi:[],
                prosecanBroj:0
            },
            {
                dan:"utorak",
                casovi:[],
                prosecanBroj:0
            },
            {
                dan:"sreda",
                casovi:[],
                prosecanBroj:0
            },
            {
                dan:"cetvrtak",
                casovi:[],
                prosecanBroj:0
            },
            {
                dan:"petak",
                casovi:[],
                prosecanBroj:0
            },
            {
                dan:"subota",
                casovi:[],
                prosecanBroj:0
            }
        ];

        casovi.forEach((cas)=>{
            listaCasovaPoDanima[new Date(cas.datum).getDay()].casovi.push(cas);
        })
        
        listaCasovaPoDanima.forEach((dan)=>{
            dan.prosecanBroj = Math.floor(dan.casovi.length/ukupanBrojCasova * 100);
        })

        res.json({"poruka": listaCasovaPoDanima})
    }
    
    brojOdrzanihCasovaPoMesecu = async (req:express.Request, res:express.Response) => {

        //prvo pronalazimo 10 najangazovanijih nastavika
        let listNastavnikaICasova: any[] = [];

        const startDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        startDate.setFullYear(startDate.getFullYear() - 1);
        startDate.setMonth(0);
        startDate.setDate(1);

        const endDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        endDate.setFullYear(2023);
        endDate.setMonth(11);
        endDate.setDate(31);


        let nastavnici = await NastavnikModel.find({"aktivan":true});
        

        for (const nastavnik of nastavnici) {

            let casoviNastavnika = await CasModel.find({ "nastavnik": nastavnik.korisnickoIme, "potvrdjen": true, datum: { $gte: startDate, $lte: endDate } })
            
            listNastavnikaICasova.push({
              "nastavnik": nastavnik.korisnickoIme,
              "casovi": casoviNastavnika,
              "brojCasovaPoMesecu":[
                {
                    mesec:"januar",
                    brojCasova:0
                },{
                    mesec:"februar",
                    brojCasova:0
                },{
                    mesec:"mart",
                    brojCasova:0
                },{
                    mesec:"april",
                    brojCasova:0
                },{
                    mesec:"maj",
                    brojCasova:0
                },{
                    mesec:"jun",
                    brojCasova:0
                },{
                    mesec:"jul",
                    brojCasova:0
                },{
                    mesec:"avgust",
                    brojCasova:0
                },{
                    mesec:"septembar",
                    brojCasova:0
                },{
                    mesec:"oktobar",
                    brojCasova:0
                },{
                    mesec:"novembar",
                    brojCasova:0
                },{
                    mesec:"decembar",
                    brojCasova:0
                },
            ],
              "brojOdrzanihCasova": casoviNastavnika.length
            });
        }
        listNastavnikaICasova.sort((a, b) => b.brojOdrzanihCasova - a.brojOdrzanihCasova);

        //najangazovanijih 10 nastavnika
        listNastavnikaICasova = listNastavnikaICasova.slice(0,10);

        listNastavnikaICasova.forEach((nastavnikCasovi)=>{
            nastavnikCasovi.casovi.forEach((cas:any)=>{
                let datum = new Date(cas.datum)
                nastavnikCasovi.brojCasovaPoMesecu[datum.getMonth()].brojCasova++;
            })
        });

        let rezultat:any[]=[];
        listNastavnikaICasova.forEach((nastavnikCasovi)=>{
            rezultat.push({
                "nastavnik":nastavnikCasovi.nastavnik,
                "brojCasovaPoMesecu":nastavnikCasovi.brojCasovaPoMesecu
            })
        })

        res.json({ "poruka": rezultat });
    }

    dohvatiBrojCasovaPreIPoslePodne = async (req:express.Request, res:express.Response) => {

        const podne  = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        podne.setHours(12, 0, 0, 0);
        
        const ponoc  = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        ponoc.setHours(0, 0, 0, 0);
        
        const prepodnevniCasovi = await CasModel.find({
            "potvrdjen": true,
            $expr: {
              $and: [
                { $lt: [{ $hour: "$datum" }, 12] },
                { $gte: [{ $hour: "$datum" }, 0] }
              ]
            }
          });
        const poslepodnevniCasovi = await CasModel.find({
        "potvrdjen": true,
        $expr: {
            $and: [
            { $gte: [{ $hour: "$datum" }, 12] },
            { $lt: [{ $hour: "$datum" }, 24] }
            ]
        }
        });
        let lista = [
            {
                doba:"prepodne",
                brojCasova:prepodnevniCasovi.length
            },
            {
                doba:"poslepodne",
                brojCasova:poslepodnevniCasovi.length
            }
        ];
        res.json({ "poruka": lista });
    }

    dohvatiBrojCasovaPoTipuSkole = async (req:express.Request, res:express.Response) => {
        
        const casovi = await CasModel.find({"potvrdjen": true});
        let brojCasovaOsnovna = 0;
        let brojCasovaGimnazija = 0;
        let brojCasovaUmetnicka = 0;
        let brojCasovaStrucna = 0;

        for (const cas of casovi) {
            const ucenik = await UcenikModel.findOne({ "korisnickoIme": cas.ucenik });
            if (ucenik?.tipSkole === "osnovna") {
              brojCasovaOsnovna++;
            } else if (ucenik?.tipSkole === "srednja-gimnazija") {
              brojCasovaGimnazija++;
            } else if (ucenik?.tipSkole === "srednja-umetnicka") {
              brojCasovaUmetnicka++;
            } else if (ucenik?.tipSkole === "srednja-strucna") {
              brojCasovaStrucna++;
            }
          }

        let lista = [
            {
                skola:"osnovna",
                brojCasova:brojCasovaOsnovna
            },
            {
                skola:"srednja-gimnazija",
                brojCasova:brojCasovaGimnazija
            },
            {
                skola:"srednja-umetnicka",
                brojCasova:brojCasovaUmetnicka
            },
            {
                skola:"srednja-strucna",
                brojCasova:brojCasovaStrucna
            }
        ];
        res.json({ "poruka": lista });
    }


    deaktivirajNastavnika = async (req:express.Request, res:express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        
        let nastavnik = await NastavnikModel.updateOne({"korisnickoIme":korisnickoIme}, {"aktivan":false, "odbijen":true})

        if(nastavnik!==null) res.json({"poruka":"Nastavnik uspesno deaktiviran."})
        else res.json({"poruka":"Korisnik nije pronadjen."})
    }

    azurirajNastavnika = async (req:express.Request, res:express.Response) => {

        let korisnickoIme = req.body.korisnickoIme;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let email = req.body.email;
        
        let nastavnik = await NastavnikModel.updateOne({"korisnickoIme":korisnickoIme}, {"ime":ime, "prezime":prezime, "adresa":adresa, "telefon":telefon, "email":email});

        if(nastavnik!==null) res.json({"poruka":"Podaci nastavnika uspesno azurirani."})
        else res.json({"poruka":"Korisnik nije pronadjen."})
    }
}