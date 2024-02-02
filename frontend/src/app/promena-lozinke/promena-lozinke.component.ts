import { Component } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent {

  constructor(private korisnikServis:KorisnikService, private router:Router){}

  korisnickoIme:string;
  staraLoznika:string;
  novaLozinka:string;
  ponovljenaNovaLozinka:string;
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

  proveraLozinke(lozinka:string){
    const lozinkaPattern = /^(?=.*?[A-Z])(?=.*?[a-z]{3})(?=.*?[0-9])(?=.*?[!@#$%^&*]).{6,10}$/;
    return lozinkaPattern.test(lozinka);
  }

  promenaLozinke(){

    if(this.novaLozinka === this.ponovljenaNovaLozinka){
      if(this.proveraLozinke(this.novaLozinka)){
        this.korisnikServis.promenaLozinke(this.korisnickoIme, this.encryptPassword(this.staraLoznika), this.encryptPassword(this.novaLozinka)).subscribe(
          (resp)=>{
            if(resp['poruka'] === "Uspesna promena lozinke."){
              this.router.navigate([""])
            }else{
              this.poruka=resp['poruka']
            }
          }
        )
      }else{
        this.poruka="Lozinka nije u ocekivanom formatu.\nMimimalno 6 karaktera, maksimalno 10 karaktera, bar 1 veliko slovo, tri mala slova, jedan broj i jedan specijalni karakter i mora pocinjati velikim slovom."
      }
    }else this.poruka="Ponovljena lozinka se ne poklapa sa novom lozinkom."
  }
}
