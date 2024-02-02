import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin';
import { AdminService } from '../services/admin.service';
import { Nastavnik } from '../models/nastavnik';

@Component({
  selector: 'app-admin-zahtevi',
  templateUrl: './admin-zahtevi.component.html',
  styleUrls: ['./admin-zahtevi.component.css']
})
export class AdminZahteviComponent implements OnInit{

  zahtevi:Nastavnik[]=[];
  admin:Admin = null;
  poruka:string = "";

  constructor(private adminServis:AdminService){}

  downloadPdf(cv:string) {
    if (cv) {
      const byteCharacters = atob(cv.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cv.pdf';
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  ngOnInit(): void {
    this.admin = JSON.parse(sessionStorage.getItem("korisnik"));
    this.dohvatiSveZahteve();
  }

  dohvatiSveZahteve(){
    this.adminServis.dohvatiSveZahteve().subscribe(
      (resp)=>{
        this.zahtevi=resp["poruka"];
      }
    )
  }

  prihvatiZahtev(korisnickoIme:string){
    this.adminServis.prihvatiZahtev(korisnickoIme).subscribe(
      (resp)=>{
        this.poruka = resp["poruka"]
        this.dohvatiSveZahteve();
      }
    )
  }

  odbijZahtev(korisnickoIme:string){
    this.adminServis.odbijZahtev(korisnickoIme).subscribe(
      (resp)=>{
        this.poruka = resp["poruka"]
        this.dohvatiSveZahteve();
      }
    )
  }

}
