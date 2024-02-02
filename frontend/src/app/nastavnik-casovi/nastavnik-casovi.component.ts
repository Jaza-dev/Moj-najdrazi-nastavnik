import { Component, OnInit } from '@angular/core';
import { Cas } from '../models/cas';
import { NastavnikService } from '../services/nastavnik.service';
import { Nastavnik } from '../models/nastavnik';

@Component({
  selector: 'app-nastavnik-casovi',
  templateUrl: './nastavnik-casovi.component.html',
  styleUrls: ['./nastavnik-casovi.component.css']
})
export class NastavnikCasoviComponent implements OnInit{

  constructor(private nastavnikServis:NastavnikService){}

  nastavnik:Nastavnik;
  potvrdjeniCasovi:Cas[] = [];
  listaZahteva:Cas[] = [];
  prosecneOcene:number[]=[];
  obrazlozenje:string = "";
  poruka:string = "";

  ngOnInit(): void {
    this.nastavnik=JSON.parse(sessionStorage.getItem("korisnik"));
    this.dohvatiPetPrvihPotvrdjenihCasova();
    this.dohvatiListuZahteva();
  }

  otkaziCas(cas:Cas){
    if(cas.obrazlozenje === ""){
      this.poruka="Unesite obrazlozenje."
      return;
    }
    this.nastavnikServis.otkaziCas(cas._id, cas.obrazlozenje).subscribe(
      (res)=>{
        this.poruka = res['poruka']
        this.dohvatiPetPrvihPotvrdjenihCasova();
      }
    )
  }

  daLiJeDozvoljenoOtkazivane(datum:Object){
    let trenutrnoVreme = new Date();
    let vremeCasa = new Date(String(datum));

    // razlike u milisekundama
    let timeDiff = Math.abs(vremeCasa.getTime() - trenutrnoVreme.getTime());

    // pretvaranje u satew
    let hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));

    if (hoursDiff > 4) {
      return true;
    } else {
      return false;
    }
  }

  dohvatiPetPrvihPotvrdjenihCasova(){
    this.nastavnikServis.dohvatiPetPrvihPotvrdjenihCasova(this.nastavnik.korisnickoIme).subscribe(
      (res)=>{
        this.potvrdjeniCasovi=res['poruka']
      }
    )
  }

  dohvatiDesetPrvihPotvrdjenihCasova(){
    this.nastavnikServis.dohvatiDesetPrvihPotvrdjenihCasova(this.nastavnik.korisnickoIme).subscribe(
      (res)=>{
        this.potvrdjeniCasovi=res['poruka']
      }
    )
  }

  dohvatiSvePotvrdjeneCasove(){
    this.nastavnikServis.dohvatiSvePotvrdjeneCasove(this.nastavnik.korisnickoIme).subscribe(
      (res)=>{
        this.potvrdjeniCasovi=res['poruka']
      }
    )
  }

  dohvatiListuZahteva(){
    this.nastavnikServis.dohvatiListuZahteva(this.nastavnik.korisnickoIme).subscribe(
      (res)=>{
        this.listaZahteva=res['poruka']
        this.dohvatiProsecneOcene();
      }
    )
  }

  potvrdi(id:string){
    this.nastavnikServis.potvrdi(id).subscribe(
      (res)=>{
        this.poruka = res['poruka']
        this.dohvatiListuZahteva()
        this.dohvatiPetPrvihPotvrdjenihCasova();
      }
    )
  }

  odbij(zahtev:Cas){
    if(zahtev.obrazlozenje === ""){
      this.poruka="Unesite obrazlozenje."
      return;
    }
    this.nastavnikServis.odbij(zahtev._id, zahtev.obrazlozenje).subscribe(
      (res)=>{
        this.poruka = res['poruka']
        this.dohvatiListuZahteva()
        this.dohvatiPetPrvihPotvrdjenihCasova();
      }
    )
  }

  dohvatiProsecneOcene(){
    this.nastavnikServis.dohvatiProsecneOcene(this.listaZahteva).subscribe(
      (resp)=>{
        this.prosecneOcene = resp['poruka']
      }
    )
  }
}
