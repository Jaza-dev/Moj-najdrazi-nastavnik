import { Component, OnInit } from '@angular/core';
import { Nastavnik } from '../models/nastavnik';
import { UcenikService } from '../services/ucenik.service';
import { NastavnikService } from '../services/nastavnik.service';
import { CasService } from '../services/cas.service';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent implements OnInit {

  constructor(private ucenikServis:UcenikService, private nastavnikServis:NastavnikService, private casServis:CasService){}

  brojUcenika:number = 0;
  brojAktivnihNastavnika:number = 0;
  brojOdrzanihCasovaNedelja:number = 0;
  brojOdrzanihCasovaMesec:number = 0;
  predmeti:any[] = [];
  imePretraga:string = "";
  prezimePretraga:string = "";
  predmetPretraga:string = "";
  nastavniciPretraga:Nastavnik[] = [];
  nacinSortiranja:boolean = false;
  pretraga:boolean=false;

  ngOnInit(): void {
    this.dohvatiBrojUcenik()
    this.dohvatiBrojNastavnika()
    this.dohvatibrojOdrzanihCasovaNedelja()
    this.dohvatiBrojOdrzanihCasovaMesec()
    this.dohvatiPredmete()
  }

  public getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  dohvatiBrojUcenik(){
    this.ucenikServis.brojUcenika().subscribe(
      (resp)=>{
        this.brojUcenika=resp['poruka']
      }
    )
  }

  dohvatiBrojNastavnika(){
    this.nastavnikServis.brojNastavnika().subscribe(
      (resp)=>{
        this.brojAktivnihNastavnika=resp['poruka']
      }
    )
  }

  dohvatibrojOdrzanihCasovaNedelja(){
    this.casServis.dohvatibrojOdrzanihCasovaNedelja().subscribe(
      (resp)=>{
        this.brojOdrzanihCasovaNedelja=resp['poruka']
      }
    )
  }

  dohvatiBrojOdrzanihCasovaMesec(){
    this.casServis.dohvatiBrojOdrzanihCasovaMesec().subscribe(
      (resp)=>{
        this.brojOdrzanihCasovaMesec=resp['poruka']
      }
    )
  }

  dohvatiPredmete(){
    this.nastavnikServis.dohvatiSvePredmeteINastavnike().subscribe(
      (resp)=>{
        this.predmeti=resp['poruka']
        console.log(this.predmeti)
      }
    )
  }

  pretrazi(){
    this.pretraga=true;
    this.nastavnikServis.pretraziNastavnika(this.imePretraga,this.prezimePretraga,this.predmetPretraga,null).subscribe(
      (resp)=>{
        this.nastavniciPretraga=resp['poruka']
        this.imePretraga=null;
        this.prezimePretraga=null;
        this.predmetPretraga=null;
      }
    )
  }

  sortirajPoImenu(){
    this.nacinSortiranja = this.nacinSortiranja ? false : true
    this.predmeti.forEach((predmet)=>{
      predmet.nastavnici.sort((a:Nastavnik, b:Nastavnik)=>{
        if(this.nacinSortiranja)
          return a.ime.localeCompare(b.ime);
        else
          return b.ime.localeCompare(a.ime);
        })
    })
  }

  sortirajPoPrezimenu(){
    this.nacinSortiranja = this.nacinSortiranja ? false : true
    this.predmeti.forEach((predmet)=>{
      predmet.nastavnici.sort((a:Nastavnik, b:Nastavnik)=>{
        if(this.nacinSortiranja)
          return a.prezime.localeCompare(b.prezime);
        else
          return b.prezime.localeCompare(a.prezime);
        })
    })
  }

  sortirajPoPredmetu(){
    this.nacinSortiranja = this.nacinSortiranja ? false : true
    this.predmeti.sort((a:any,b:any):any=> {
      if(this.nacinSortiranja)
        return b.predmet.localeCompare(a.predmet);
      else
        return a.predmet.localeCompare(b.predmet);
    })
  }
}
