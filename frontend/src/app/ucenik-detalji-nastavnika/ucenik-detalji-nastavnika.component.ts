import { Component, OnInit } from '@angular/core';
import { Nastavnik } from '../models/nastavnik';
import { UcenikService } from '../services/ucenik.service';
import { Ucenik } from '../models/ucenik';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Cas } from '../models/cas';
import { NastavnikService } from '../services/nastavnik.service';

@Component({
  selector: 'app-ucenik-detalji-nastavnika',
  templateUrl: './ucenik-detalji-nastavnika.component.html',
  styleUrls: ['./ucenik-detalji-nastavnika.component.css']
})
export class UcenikDetaljiNastavnikaComponent implements OnInit {

  nastavnik:Nastavnik = new Nastavnik();
  ucenik:Ucenik = new Ucenik();

  predmetZakazivanje:string="";
  datumZakazivanje:string="";
  opisZakazivanje:string="";
  brojPredmeta:number = 0;
  sviOdrzaniCasovi:Cas[]=[];
  zelimDodatniCas:boolean=false;

  poruka:string="";
  constructor(private ucenikServis:UcenikService, private nastavnikServis:NastavnikService){}

  ngOnInit(): void {
    this.nastavnik = JSON.parse(sessionStorage.getItem("nastavnikDetalji"))
    this.ucenik = JSON.parse(sessionStorage.getItem("korisnik"))
    this.dohvatiSveOdrzaneCasove()
    this.brojPredmeta=this.nastavnik.predmeti.length
    if(this.brojPredmeta==1)this.predmetZakazivanje=this.nastavnik.predmeti[0]
  }

  dohvatiSveOdrzaneCasove(){

    this.nastavnikServis.dohvatiSveOdrzaneCasove(this.nastavnik.korisnickoIme).subscribe(
      (resp)=>{
        this.sviOdrzaniCasovi=resp['poruka']
      }
    )
  }

  zakaziCasPutemForme(){
    if(this.predmetZakazivanje===""||this.datumZakazivanje===""||this.opisZakazivanje===""){
      this.poruka="Popunite sva polja kako bi ste zakazali cas."
      return;
    }
    this.ucenikServis.zakaziCasPutemForme(this.predmetZakazivanje,this.datumZakazivanje,this.opisZakazivanje,this.zelimDodatniCas, this.ucenik.korisnickoIme, this.nastavnik.korisnickoIme, this.ucenik.ime, this.ucenik.prezime).subscribe(
      (resp)=>{
        this.poruka = resp['poruka'];
      }
    )
  }

}
