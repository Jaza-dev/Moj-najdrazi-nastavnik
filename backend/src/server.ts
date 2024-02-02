import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import ucenikRouter from './routers/ucenik.routes';
import nastavnikRouter from './routers/nastavnik.routes';
import adminRouter from './routers/admin.routes';
import korisnikRouter from './routers/korisnik.routes';
import casRouter from './routers/cas.routes';


const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/skola');

const router = express.Router();
router.use('/ucenik', ucenikRouter);
router.use('/nastavnik', nastavnikRouter);
router.use('/admin', adminRouter);
router.use('/korisnik', korisnikRouter);
router.use('/cas', casRouter);
app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));