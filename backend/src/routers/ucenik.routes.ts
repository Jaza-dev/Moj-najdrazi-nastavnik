import express from 'express'
import { UcenikController } from '../controllers/ucenik.controller';

const ucenikRouter = express.Router();

ucenikRouter.route('/prijava').post(
    (req,res) => new UcenikController().prijava(req, res)
)

ucenikRouter.route('/registracija').post(
    (req, res) => new UcenikController().registracija(req, res)
)

ucenikRouter.route('/brojUcenika').get(
    (req,res) => new UcenikController().brojUcenika(req,res)
)

ucenikRouter.route('/azurirajPodatke').post(
    (req,res) => new UcenikController().azurirajPodatke(req,res)
)

ucenikRouter.route('/odrzaniCasovi').post(
    (req,res) => new UcenikController().odrzaniCasovi(req,res)
)

ucenikRouter.route('/predstojeciCasovi').post(
    (req,res) => new UcenikController().predstojeciCasovi(req,res)
)

ucenikRouter.route('/zakaziCasPutemForme').post(
    (req,res) => new UcenikController().zakaziCasPutemForme(req,res)
)

ucenikRouter.route('/ostaviOcenuIKomentar').post(
    (req,res) => new UcenikController().ostaviOcenuIKomentar(req,res)
)

ucenikRouter.route('/dohvatiSvaObavestenja').post(
    (req,res) => new UcenikController().dohvatiSvaObavestenja(req,res)
)

export default ucenikRouter;