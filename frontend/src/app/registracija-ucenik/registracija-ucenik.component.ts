import { Component } from '@angular/core';
import { UcenikService } from '../services/ucenik.service';
import { Router } from '@angular/router';
import { Ucenik } from '../models/ucenik';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registracija-ucenik',
  templateUrl: './registracija-ucenik.component.html',
  styleUrls: ['./registracija-ucenik.component.css']
})
export class RegistracijaUcenikComponent {

  constructor(private ucenikServis:UcenikService, private router:Router, private http:HttpClient){}

  ucenik:Ucenik=new Ucenik();
  poruka:string = "";

  handleFileUpload(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        this.ucenik.slika=base64String;
      };

      reader.readAsDataURL(file);
    }
  }

  //preuzeto sa interneta
  encryptPassword(password: string): string {
    let encryptedPassword = '';

    for (let i = 0; i < password.length; i++) {
      const charCode = password.charCodeAt(i);
      const encryptedCharCode = charCode + 1; // Shift each character by 1 (you can modify this logic as per your requirements)
      const encryptedChar = String.fromCharCode(encryptedCharCode);
      encryptedPassword += encryptedChar;
    }

    return encryptedPassword;
  }

  proveraLozinke(lozinka:string){
    const lozinkaPattern = /^(?=.*?[A-Z])(?=.*?[a-z]{3})(?=.*?[0-9])(?=.*?[!@#$%^&*]).{6,10}$/;
    return lozinkaPattern.test(lozinka);
  }

  registacija(){
    if(this.proveraLozinke(this.ucenik.lozinka)){
      if(this.ucenik.korisnickoIme===""||this.ucenik.pitanje===""||this.ucenik.odgovor===""||this.ucenik.ime===""||this.ucenik.prezime===""||this.ucenik.pol===""||this.ucenik.adresa===""||this.ucenik.telefon===""||this.ucenik.email===""){
        this.poruka="Sva polja moraju biti popunjena."
        return;
      }

      //korisnik nije odabrao sliku
      if(this.ucenik.slika===""){
        this.ucenik.slika="/assets/profile.jpg"
      }

      this.ucenik.lozinka=this.encryptPassword(this.ucenik.lozinka)
      this.ucenikServis.registracija(this.ucenik).subscribe(
        (resp)=>{
          if(resp['poruka'] === "Korisnink sa tim korisnickim imenom vec postoji."){
            this.poruka = resp['poruka']
          }else if(resp['poruka'] === "Korisnink sa tom e-mail adresom vec postoji."){
            this.poruka = resp['poruka']
          }else{
            this.router.navigate([''])
          }
        }
      )
    }else{
      this.poruka="Lozinka nije u ocekivanom formatu.\nMimimalno 6 karaktera, maksimalno 10 karaktera, bar 1 veliko slovo, tri mala slova, jedan broj i jedan specijalni karakter i mora pocinjati velikim slovom."
    }

  }
}
