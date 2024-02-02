import express from 'express'
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/promenaLozinke').post(
    (req,res) => new KorisnikController().promenaLozinke(req,res)
)

korisnikRouter.route('/dohvatiKorisnika').post(
    (req,res) => new KorisnikController().dohvatiKorisnika(req,res)
)

korisnikRouter.route('/zaboravljenaLozinka').post(
    (req,res) => new KorisnikController().zaboravljenaLozinka(req,res)
)

export default korisnikRouter;