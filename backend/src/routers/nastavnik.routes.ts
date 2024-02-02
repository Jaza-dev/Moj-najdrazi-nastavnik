import express from 'express'
import { NastavnikController } from '../controllers/nastavnik.controller';

const nastavnikRouter = express.Router();

nastavnikRouter.route('/prijava').post(
    (req,res)=>new NastavnikController().prijava(req, res)
)

nastavnikRouter.route('/dohvatiSveOdobrenePredmete').get(
    (req, res) => new NastavnikController().dohvatiSveOdobrenePredmete(req, res)
)

nastavnikRouter.route('/registracija').post(
    (req, res) => new NastavnikController().registracija(req, res)
)

nastavnikRouter.route('/kreirajZahtevZaNoviPredmet').post(
    (req, res) => new NastavnikController().kreirajZahtevZaNoviPredmet(req, res)
)

nastavnikRouter.route('/brojNastavnika').get(
    (req, res) => new NastavnikController().brojNastavnika(req, res)
)

nastavnikRouter.route('/dohvatiSvePredmeteINastavnike').get(
    (req, res) => new NastavnikController().dohvatiSvePredmeteINastavnike(req, res)
)

nastavnikRouter.route('/dohvatiOdredjenePredmeteINastavnike').post(
    (req, res) => new NastavnikController().dohvatiOdredjenePredmeteINastavnike(req, res)
)

nastavnikRouter.route('/pretraziNastavnika').post(
    (req, res) => new NastavnikController().pretraziNastavnika(req, res)
)

nastavnikRouter.route('/azurirajPodatke').post(
    (req, res) => new NastavnikController().azurirajPodatke(req, res)
)

nastavnikRouter.route('/dohvatiMojeUcenike').post(
    (req, res) => new NastavnikController().dohvatiMojeUcenike(req, res)
)

nastavnikRouter.route('/dohvatiPetPrvihPotvrdjenihCasova').post(
    (req, res) => new NastavnikController().dohvatiPetPrvihPotvrdjenihCasova(req, res)
)

nastavnikRouter.route('/dohvatiDesetPrvihPotvrdjenihCasova').post(
    (req, res) => new NastavnikController().dohvatiDesetPrvihPotvrdjenihCasova(req, res)
)

nastavnikRouter.route('/dohvatiSvePotvrdjeneCasove').post(
    (req, res) => new NastavnikController().dohvatiSvePotvrdjeneCasove(req, res)
)

nastavnikRouter.route('/dohvatiListuZahteva').post(
    (req, res) => new NastavnikController().dohvatiListuZahteva(req, res)
)

nastavnikRouter.route('/potvrdi').post(
    (req, res) => new NastavnikController().potvrdi(req, res)
)

nastavnikRouter.route('/odbij').post(
    (req, res) => new NastavnikController().odbij(req, res)
)

nastavnikRouter.route('/ostaviOcenuIKomentar').post(
    (req, res) => new NastavnikController().ostaviOcenuIKomentar(req, res)
)

nastavnikRouter.route('/dohvatiProsecneOcene').post(
    (req, res) => new NastavnikController().dohvatiProsecneOcene(req, res)
)

nastavnikRouter.route('/otkaziCas').post(
    (req, res) => new NastavnikController().otkaziCas(req, res)
)

nastavnikRouter.route('/dohvatiSveOdrzaneCasove').post(
    (req, res) => new NastavnikController().dohvatiSveOdrzaneCasove(req, res)
)


export default nastavnikRouter;