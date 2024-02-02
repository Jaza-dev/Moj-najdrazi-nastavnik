import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin';
import { AdminService } from '../services/admin.service';
import { Predmet } from '../models/predmet';

@Component({
  selector: 'app-admin-predmeti',
  templateUrl: './admin-predmeti.component.html',
  styleUrls: ['./admin-predmeti.component.css']
})
export class AdminPredmetiComponent implements OnInit  {

  admin:Admin=new Admin();
  sviNeodobreniZahtevi:Predmet[]=[];
  noviPredmet:string="";
  poruka:string="";

  constructor(private adminServis:AdminService){}

  ngOnInit(): void {
    this.admin = JSON.parse(sessionStorage.getItem("korisnik"));
    this.dohvatiSveNeodobrenePredmete();
  }

  dohvatiSveNeodobrenePredmete(){
    this.adminServis.dohvatiSveNeodobrenePredmete().subscribe(
      resp=>{
        this.sviNeodobreniZahtevi=resp['poruka'];
      }
    )
  }

  odobriPredmet(_id:string){
    this.adminServis.odobriPredmet(_id).subscribe(
      resp=>{
        this.poruka=resp['poruka']
        this.dohvatiSveNeodobrenePredmete();
      }
    )
  }

  odbijPredmet(_id:string){
    this.adminServis.odbijPredmet(_id).subscribe(
      resp=>{
        this.poruka=resp['poruka']
        this.dohvatiSveNeodobrenePredmete();
      }
    )
  }

  kreirajPredmet(){
    this.adminServis.kreirajPredmet(this.noviPredmet).subscribe(
      resp=>{
        this.poruka=resp['poruka']
        this.noviPredmet="";
      }
    )
  }
}
