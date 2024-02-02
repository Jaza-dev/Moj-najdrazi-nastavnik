import { Component, OnInit } from '@angular/core';
import { Nastavnik } from '../models/nastavnik';
import { NastavnikService } from '../services/nastavnik.service';
import { Ucenik } from '../models/ucenik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nastavnik-ucenik-dosije-detaljnije',
  templateUrl: './nastavnik-ucenik-dosije-detaljnije.component.html',
  styleUrls: ['./nastavnik-ucenik-dosije-detaljnije.component.css']
})
export class NastavnikUcenikDosijeDetaljnijeComponent implements OnInit {

  ucenik:any = null;
  nastavnik:Nastavnik = new Nastavnik();
  poruka:string = ""

  constructor(private nastavnikServis:NastavnikService, private router:Router){}

  ngOnInit(): void {
    this.nastavnik=JSON.parse(sessionStorage.getItem("korisnik"));
    this.ucenik = JSON.parse(sessionStorage.getItem("ucenikDosije"));
  }

  ostaviOcenuIKomentar(event: { komentar: string; ocena: number }, _id:string) {
    const { komentar, ocena } = event;
    this.nastavnikServis.ostaviOcenuIKomentar(_id,komentar,ocena).subscribe(
      (resp)=>{
        this.poruka = resp["poruka"];
        this.router.navigate(['mojiUcenici'])
      }
    )
  }

  formatirajDatum(datum:string){
    const parts = datum.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const formattedDate = `${day}.${month}.${year}.`;

    return formattedDate;
  }
}
