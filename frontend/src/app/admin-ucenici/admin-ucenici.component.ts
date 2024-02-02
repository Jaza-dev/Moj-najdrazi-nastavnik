import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Ucenik } from '../models/ucenik';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-admin-ucenici',
  templateUrl: './admin-ucenici.component.html',
  styleUrls: ['./admin-ucenici.component.css']
})
export class AdminUceniciComponent implements OnInit {

  admin:Admin=new Admin();
  sviUcenici:Ucenik[]=[];
  poruka:string="";

  constructor(private adminServis:AdminService){}

  ngOnInit(): void {
    this.admin = JSON.parse(sessionStorage.getItem("korisnik"));
    this.dohvatiSveUcenike();
  }

  dohvatiSveUcenike(){
    this.adminServis.dohvatiSveUcenike().subscribe(
      (resp)=>{
        this.sviUcenici=resp["poruka"];
        if(this.sviUcenici===null) this.poruka = "Nema registrovanih ucenika u sistemu."
      }
    )
  }
}
