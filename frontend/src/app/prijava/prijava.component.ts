import { Component } from '@angular/core';
import { UcenikService } from '../services/ucenik.service';
import { NastavnikService } from '../services/nastavnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent {

  constructor(private ucenikService: UcenikService, private nastavnikServis: NastavnikService, private router:Router){}

  korisnickoIme:string;
  lozinka:string;
  tip:string;
  poruka:string = "";

  //preuzeto sa interneta
  encryptPassword(password: string): string {
    let encryptedPassword = '';

    for (let i = 0; i < password.length; i++) {
      const charCode = password.charCodeAt(i);
      const encryptedCharCode = charCode + 1;
      const encryptedChar = String.fromCharCode(encryptedCharCode);
      encryptedPassword += encryptedChar;
    }

    return encryptedPassword;
  }


  prijava(){
    if(this.tip === "ucenik"){

      this.ucenikService.prijava(this.korisnickoIme,this.encryptPassword(this.lozinka)).subscribe(
        resp=>{
          let ucenik = resp['poruka'];
          if(ucenik === null){
            this.poruka="Pogresno korisnicko ime ili lozinka."
          }else{
            sessionStorage.setItem("korisnik", JSON.stringify(ucenik));
            this.router.navigate(['ucenik']);
          }
        }
      )
    }else{
      this.nastavnikServis.prijava(this.korisnickoIme,this.encryptPassword(this.lozinka)).subscribe(
        resp=>{
          let nastavnik = resp['poruka'];
          if(nastavnik === null){
            this.poruka="Pogresno korisnicko ime ili lozinka."
            return;
          }else{
            if(nastavnik.aktivan===false){
              this.poruka="Korisnik nije odobren od strane administratora."
              return;
            }
            sessionStorage.setItem("korisnik", JSON.stringify(nastavnik));
            this.router.navigate(['nastavnik']);
          }
        }
      )
    }

  }
}
