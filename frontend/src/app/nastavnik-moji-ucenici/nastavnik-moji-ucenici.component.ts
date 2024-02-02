import { Component, OnInit } from '@angular/core';
import { NastavnikService } from '../services/nastavnik.service';
import { Nastavnik } from '../models/nastavnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nastavnik-moji-ucenici',
  templateUrl: './nastavnik-moji-ucenici.component.html',
  styleUrls: ['./nastavnik-moji-ucenici.component.css']
})
export class NastavnikMojiUceniciComponent implements OnInit  {
  constructor(private nastavnikServis:NastavnikService, private router:Router){}

  nastavnik:Nastavnik;
  casovi:any[] = [];

  ngOnInit(): void {
    this.nastavnik = JSON.parse(sessionStorage.getItem("korisnik"));
    this.dohvatiMojeUcenike();
  }

  dohvatiMojeUcenike(){
    this.nastavnikServis.dohvatiMojeUcenike(this.nastavnik.korisnickoIme).subscribe(
      (resp)=>{
        this.casovi = resp['poruka']
      }
    )
  }

  detaljnije(ucenik:JSON){
    sessionStorage.setItem("ucenikDosije", JSON.stringify(ucenik));
    this.router.navigate(['ucenikDosijeDetaljnije'])
  }
}
