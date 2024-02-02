import { Component, OnInit } from '@angular/core';
import { Ucenik } from '../models/ucenik';
import { UcenikService } from '../services/ucenik.service';
import { Obavestenje } from '../models/obavestenje';

@Component({
  selector: 'app-ucenik-obavestenja',
  templateUrl: './ucenik-obavestenja.component.html',
  styleUrls: ['./ucenik-obavestenja.component.css']
})
export class UcenikObavestenjaComponent implements OnInit  {


  constructor(private ucenikServis:UcenikService){}

  ucenik:Ucenik = new Ucenik();
  svaObavestenja:Obavestenje[] = [];
  poruka:string = "";


  ngOnInit(): void {
    this.ucenik = JSON.parse(sessionStorage.getItem("korisnik"));
    this.dohvatiSvaObavestenja();
  }

  formatirajDatum(datum: Object) {

    let datumString = new Date(String(datum)).toLocaleDateString();
    const parts = datumString.split('/');
    const year = parts[2];
    const month = parts[0].padStart(2, '0');
    const day = parts[1].padStart(2, '0');

    const formattedDate = `${day}.${month}.${year}.`;

    return formattedDate;
  }

  dohvatiSvaObavestenja(){
    this.ucenikServis.dohvatiSvaObavestenja(this.ucenik.korisnickoIme).subscribe(
      (resp)=>{
        this.svaObavestenja=resp['poruka'];
        if(this.svaObavestenja.length === 0) this.poruka="Nemate obavestenja."
        this.sortirajObavestenja();
      }
    )
  }

  sortirajObavestenja(){
    return this.svaObavestenja.sort((a, b) => {
      const dateA = new Date(String(a.datumObavestenja));
      const dateB = new Date(String(b.datumObavestenja));
      return dateB.getTime() - dateA.getTime();
    });
  }

}
