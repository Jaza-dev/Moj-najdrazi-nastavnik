import { Component, OnInit } from '@angular/core';
import { NastavnikService } from '../services/nastavnik.service';
import { Router } from '@angular/router';
import { Nastavnik } from '../models/nastavnik';
import { Ucenik } from '../models/ucenik';

@Component({
  selector: 'app-ucenik-prikaz-nastavnika',
  templateUrl: './ucenik-prikaz-nastavnika.component.html',
  styleUrls: ['./ucenik-prikaz-nastavnika.component.css']
})
export class UcenikPrikazNastavnikaComponent implements OnInit  {

  constructor(private nastavnikServis:NastavnikService, private router:Router){}

  predmeti:any[] = [];
  imePretraga:string = null;
  prezimePretraga:string = null;
  predmetPretraga:string = null;
  nastavniciPretraga:Nastavnik[]=[];
  ucenik:Ucenik;
  pretraga:boolean = false;

  ngOnInit(): void {
    this.ucenik = JSON.parse(sessionStorage.getItem("korisnik"))
    this.dohvatiPredmete();
  }

  dohvatiPredmete(){
    let uzrast:string;
    if(this.ucenik.tipSkole === "osnovna"){
      if(this.ucenik.razred < 5)
        uzrast = "osnovna skola 1-4. razred"
      else
        uzrast = "osnovna skola 5-8. razred"
    }else {
      uzrast = "srednja skola"
    }
    this.nastavnikServis.dohvatiOdredjenePredmeteINastavnike(uzrast).subscribe(
      (resp)=>{
        this.predmeti=resp['poruka']
      }
    )
  }

  pretrazi(){
    this.pretraga=true;
    let uzrast:string;
    if(this.ucenik.tipSkole === "osnovna"){
      if(this.ucenik.razred < 5)
        uzrast = "osnovna skola 1-4. razred"
      else
        uzrast = "osnovna skola 5-8. razred"
    }else {
      uzrast = "srednja skola"
    }
    this.nastavnikServis.pretraziNastavnika(this.imePretraga,this.prezimePretraga,this.predmetPretraga,uzrast).subscribe(
      (resp)=>{
        this.nastavniciPretraga=resp['poruka']
        this.imePretraga=null;
        this.prezimePretraga=null;
        this.predmetPretraga=null;
      }
    )
  }

  nastavnikDetalji(nastavnik:Nastavnik){
    sessionStorage.setItem("nastavnikDetalji", JSON.stringify(nastavnik))
    this.router.navigate(["detaljiNastavnika"])
  }

}
