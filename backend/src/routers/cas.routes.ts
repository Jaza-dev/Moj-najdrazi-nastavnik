import express from 'express'
import { CasController } from '../controllers/cas.controller';

const casRouter = express.Router();

casRouter.route('/kreirajCas').post(
    (req,res)=>new CasController().kreirajCas(req, res)
)

casRouter.route('/brojOdrzanihCasovaNedelja').get(
    (req,res)=>new CasController().brojOdrzanihCasovaNedelja(req, res)
)

casRouter.route('/brojOdrzanihCasovaMesec').get(
    (req,res)=>new CasController().brojOdrzanihCasovaMesec(req, res)
)
export default casRouter;