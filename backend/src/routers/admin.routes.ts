import express from 'express'
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.route('/prijava').post(
    (req,res)=>new AdminController().prijava(req, res)
)

adminRouter.route('/dohvatiSveUcenike').get(
    (req,res)=>new AdminController().dohvatiSveUcenike(req, res)
)

adminRouter.route('/dohvatiSveNastavnike').get(
    (req,res)=>new AdminController().dohvatiSveNastavnike(req, res)
)

adminRouter.route('/dohvatiSveZahteve').get(
    (req,res)=>new AdminController().dohvatiSveZahteve(req, res)
)

adminRouter.route('/prihvatiZahtev').post(
    (req,res)=>new AdminController().prihvatiZahtev(req, res)
)
adminRouter.route('/odbijZahtev').post(
    (req,res)=>new AdminController().odbijZahtev(req, res)
)
adminRouter.route('/dohvatiSveNeodobrenePredmete').get(
    (req,res)=>new AdminController().dohvatiSveNeodobrenePredmete(req, res)
)
adminRouter.route('/odobriPredmet').post(
    (req,res)=>new AdminController().odobriPredmet(req, res)
)
adminRouter.route('/odbijPredmet').post(
    (req,res)=>new AdminController().odbijPredmet(req, res)
)

adminRouter.route('/kreirajPredmet').post(
    (req,res)=>new AdminController().kreirajPredmet(req, res)
)

adminRouter.route('/dohvatiSveUzrasteINastavnike').get(
    (req,res)=>new AdminController().dohvatiSveUzrasteINastavnike(req, res)
)

adminRouter.route('/dohvatiSvePoloveINastavnike').get(
    (req,res)=>new AdminController().dohvatiSvePoloveINastavnike(req, res)
)

adminRouter.route('/dohvatiSvePoloveIUcenike').get(
    (req,res)=>new AdminController().dohvatiSvePoloveIUcenike(req, res)
)

adminRouter.route('/dohvatiSveCasovePoDanima').get(
    (req,res)=>new AdminController().dohvatiSveCasovePoDanima(req, res)
)

adminRouter.route('/brojOdrzanihCasovaPoMesecu').get(
    (req,res)=>new AdminController().brojOdrzanihCasovaPoMesecu(req, res)
)

adminRouter.route('/dohvatiBrojCasovaPreIPoslePodne').get(
    (req,res)=>new AdminController().dohvatiBrojCasovaPreIPoslePodne(req, res)
)

adminRouter.route('/dohvatiBrojCasovaPoTipuSkole').get(
    (req,res)=>new AdminController().dohvatiBrojCasovaPoTipuSkole(req, res)
)

adminRouter.route('/deaktivirajNastavnika').post(
    (req,res)=>new AdminController().deaktivirajNastavnika(req, res)
)

adminRouter.route('/azurirajNastavnika').post(
    (req,res)=>new AdminController().azurirajNastavnika(req, res)
)



export default adminRouter;