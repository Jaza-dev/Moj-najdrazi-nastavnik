import { Component, OnInit } from '@angular/core';
import { Cas } from '../models/cas';
import { Ucenik } from '../models/ucenik';
import { UcenikService } from '../services/ucenik.service';

@Component({
  selector: 'app-ucenik-arhiva-casova',
  templateUrl: './ucenik-arhiva-casova.component.html',
  styleUrls: ['./ucenik-arhiva-casova.component.css']
})
export class UcenikArhivaCasovaComponent implements OnInit {

  constructor(private ucenikServis:UcenikService){}

  ucenik:Ucenik = new Ucenik();
  odrzaniCasovi:Cas[]=[];
  predstojeciCasovi:Cas[]=[];
  prikaz:boolean = true;
  poruka:string = "";

  ngOnInit(): void {
    this.ucenik = JSON.parse(sessionStorage.getItem("korisnik"));
    this.dohvatiOdrzaneCasove(this.ucenik.korisnickoIme);
    this.dohvatiPredstojeceCasove(this.ucenik.korisnickoIme);
  }

  ostaviOcenuIKomentar(event: { komentar: string; ocena: number }, _id:string) {
    const { komentar, ocena } = event;
    this.ucenikServis.ostaviOcenuIKomentar(_id,komentar,ocena).subscribe(
      (resp)=>{
        this.poruka = resp["poruka"];
        this.dohvatiOdrzaneCasove(this.ucenik.korisnickoIme);
      }
    )
  }

  sortirajPoDatumuRastuce(casovi:Cas[]){
    return casovi.sort((a:any, b:any) => new Date(a.datum).getTime() - new Date(b.datum).getTime());
  }

  sortirajPoDatumuOpadajuce(casovi:Cas[]){
    return casovi.sort((a:any, b:any) => new Date(b.datum).getTime() - new Date(a.datum).getTime());
  }

  promeniPrikaz(){
    this.prikaz=this.prikaz?false:true;
  }

  dohvatiOdrzaneCasove(korisnickoIme:string){
    this.ucenikServis.dohvatiOdrzaneCasove(korisnickoIme).subscribe(
      (resp)=>{
        this.odrzaniCasovi = resp['poruka']
        this.sortirajPoDatumuOpadajuce(this.odrzaniCasovi)
      }
    )
  }

  dohvatiPredstojeceCasove(korisnickoIme:string){
    this.ucenikServis.dohvatiPredstojeceCasove(korisnickoIme).subscribe(
      (resp)=>{
        this.predstojeciCasovi = resp['poruka']
        this.sortirajPoDatumuRastuce(this.predstojeciCasovi)
      }
    )
  }

  formatirajDatum(datum:Object){
    let dateString =  datum.toString()
    const date = new Date(dateString);
    date.setHours(date.getHours() - 1);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year}. ${hours}:${minutes}`;

  }

  formatirajDatumKraja(datum:Object, trajanje:number){
    let dateString =  datum.toString()
    const date = new Date(dateString);

    date.setHours(date.getHours() + trajanje - 1);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year}. ${hours}:${minutes}`;
  }
}
