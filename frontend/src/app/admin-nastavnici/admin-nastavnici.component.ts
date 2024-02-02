import { Component, OnInit } from '@angular/core';
import { Nastavnik } from '../models/nastavnik';
import { Admin } from '../models/admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-nastavnici',
  templateUrl: './admin-nastavnici.component.html',
  styleUrls: ['./admin-nastavnici.component.css']
})
export class AdminNastavniciComponent implements OnInit  {

  sviNastavnici:Nastavnik[] = [];
  admin:Admin = null;
  poruka:string = "";

  ngOnInit(): void {
    this.admin = JSON.parse(sessionStorage.getItem("korisnik"));
    this.dohvatiSveNastavnike();
  }

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

  azurirajNastavnika(korisnickoIme:string, ime:string, prezime:string, adresa:string, telefon:string, email:string){
    this.adminServis.azurirajNastavnika(korisnickoIme, ime, prezime, adresa, telefon, email).subscribe(
      (resp)=>{
        this.poruka=resp['poruka'];
        this.dohvatiSveNastavnike();
      }
    )
  }

  deaktivirajNastavnika(korisnickoIme:string){
    this.adminServis.deaktivirajNastavnika(korisnickoIme).subscribe(
      (resp)=>{
        this.poruka=resp['poruka'];
        this.dohvatiSveNastavnike();
      }
    )
  }

  dohvatiSveNastavnike(){
    this.adminServis.dohvatiSveNastavnike().subscribe(
      (resp)=>{
        this.sviNastavnici=resp["poruka"];
        if(this.sviNastavnici===null) this.poruka = "Nema registrovanih nastavnika u sistemu."
      }
    )
  }

}
