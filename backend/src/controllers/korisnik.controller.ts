import express from 'express'
import UcenikModel from '../models/ucenik'
import NastavnikModel from '../models/nastavnik'
import AdminModel from '../models/admin'

export class KorisnikController {

    promenaLozinke = async (req:express.Request, res:express.Response) => {

        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        let novaLozinka = req.body.novaLozinka;
        let korisnik;
      
        korisnik = await UcenikModel.findOne({'korisnickoIme': korisnickoIme, 'lozinka': lozinka});
      
        if (korisnik !== null) {
            await UcenikModel.updateOne({'korisnickoIme': korisnickoIme, 'lozinka': lozinka}, {$set: {'lozinka': novaLozinka}});
            return res.json({'poruka': 'Uspesna promena lozinke.'});
        }
        
        korisnik = await NastavnikModel.findOne({'korisnickoIme': korisnickoIme, 'lozinka': lozinka});
      
        if (korisnik !== null) {
            await NastavnikModel.updateOne({'korisnickoIme': korisnickoIme, 'lozinka': lozinka}, {$set: {'lozinka': novaLozinka}});
            return res.json({'poruka': 'Uspesna promena lozinke.'});
        }
        
        korisnik = await AdminModel.findOne({'korisnickoIme': korisnickoIme, 'lozinka': lozinka});
      
        if (korisnik !== null) {
            await AdminModel.updateOne({'korisnickoIme': korisnickoIme, 'lozinka': lozinka}, {$set: {'lozinka': novaLozinka}});
            return res.json({'poruka': 'Uspesna promena lozinke.'});
        }
      
        res.json({'poruka': 'Korisnik nije pronadjen.'});
        
    }

    dohvatiKorisnika = async (req:express.Request, res:express.Response) => { 
        let korisnickoIme = req.body.korisnickoIme;

        let korisnik = await UcenikModel.findOne({ 'korisnickoIme': korisnickoIme });
      
        if (korisnik !== null) {
            return res.json({'poruka': korisnik});
        }
        
        korisnik = await NastavnikModel.findOne({'korisnickoIme': korisnickoIme});
      
        if (korisnik !== null) {
            return res.json({'poruka': korisnik});
        }
        
        korisnik = await AdminModel.findOne({'korisnickoIme': korisnickoIme});
      
        if (korisnik !== null) {
            return res.json({'poruka': korisnik});
        }
      
        res.json({'poruka': null});
        
    }


    zaboravljenaLozinka = async (req:express.Request, res:express.Response) => { 
        let korisnickoIme = req.body.korisnickoIme;
        let novaLozinka = req.body.novaLozinka;

        let korisnik = await UcenikModel.findOne({'korisnickoIme': korisnickoIme});
      
        if (korisnik !== null) {
            await UcenikModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'lozinka': novaLozinka}});
            return res.json({'poruka': 'Uspesna promena lozinke.'});
        }
        
        korisnik = await NastavnikModel.findOne({'korisnickoIme': korisnickoIme});
      
        if (korisnik !== null) {
            await NastavnikModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'lozinka': novaLozinka}});
            return res.json({'poruka': 'Uspesna promena lozinke.'});
        }
        
        korisnik = await AdminModel.findOne({'korisnickoIme': korisnickoIme});
      
        if (korisnik !== null) {
            await AdminModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'lozinka': novaLozinka}});
            return res.json({'poruka': 'Uspesna promena lozinke.'});
        }
      
        res.json({'poruka': 'Korisnik nije pronadjen.'});
    }


}