import { Component } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zaboravljena-lozinka',
  templateUrl: './zaboravljena-lozinka.component.html',
  styleUrls: ['./zaboravljena-lozinka.component.css']
})
export class ZaboravljenaLozinkaComponent {
  constructor(private korisnikServis:KorisnikService, private router:Router){}

  korisnickoIme:string="";
  korisnik:any=null;
  odgovor:string="";
  novaLozinka="";
  ponovljenaNovaLozinka:string="";
  poruka:string = "";
  korak:number=0;

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

  dohvatiKorisnika(){
    this.korisnikServis.dohvatiKorisnika(this.korisnickoIme).subscribe(
      (resp)=>{
        this.korisnik=resp['poruka'];
        if(this.korisnik===null){
          this.poruka="Korisnik sa tim korisnickim imenom ne postoji u sistemu.";
        }else{
          this.korak=1;
          this.poruka="";
        }
      }
    )
  }

  odgovoriNaPitanje(){
    if(this.korisnik.odgovor === this.odgovor){
      this.korak=2;
      this.poruka="";
    }else{
      this.poruka="Netacan odgovor, pokusajte opet."
    }
  }

  zboravljenaLozinka(){

    if(this.novaLozinka === this.ponovljenaNovaLozinka){
      if(this.proveraLozinke(this.novaLozinka)){
        this.korisnikServis.zaboravljenaLozinka(this.korisnickoIme, this.encryptPassword(this.novaLozinka)).subscribe(
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
