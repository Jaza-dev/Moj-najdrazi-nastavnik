import { Component, OnInit } from '@angular/core';
import { NastavnikService } from '../services/nastavnik.service';
import { Router } from '@angular/router';
import { Predmet } from '../models/predmet';
import { Nastavnik } from '../models/nastavnik';

@Component({
  selector: 'app-registracija-nastavnik',
  templateUrl: './registracija-nastavnik.component.html',
  styleUrls: ['./registracija-nastavnik.component.css']
})
export class RegistracijaNastavnikComponent implements OnInit{



  constructor(private nastavnikServis:NastavnikService, private router:Router){}

  nastavnik:Nastavnik=new Nastavnik();
  predmetiSelektovani:boolean[] = [];
  odobreniPredmeti:Predmet[]=[];
  nestoDrugo:string="";
  uzrastSelektovani:boolean[] = [];
  sledeciKorak:boolean = false;
  poruka:string = "";
  staraLozinka:string="";

  ngOnInit(): void {
    this.dohvatiSveOdobrenePredmete();
  }

  dohvatiSveOdobrenePredmete(){
    this.nastavnikServis.dohvatiSveOdobrenePredmete().subscribe(
      (resp)=>{
        this.odobreniPredmeti=resp['poruka'];
      }
    )
  }

  dalje(){
    this.sledeciKorak = this.sledeciKorak ? false : true;
  }

  handleFileUpload(event: Event, tip:boolean) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files[0];

    if(file && tip === true){
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        this.nastavnik.slika=base64String;

      };

      reader.readAsDataURL(file);
    }
    else if(file && tip === false) {
      const maxSizeInBytes = 3 * 1024 * 1024; // 3MB
      if (file.size <= maxSizeInBytes) {
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result as string;
          this.nastavnik.cv = base64String;
        };
        reader.readAsDataURL(file);
      } else {
        this.poruka="Velicina fajla je preko 3MB."
      }
    }
  }



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

  registracija(){
    if(this.proveraLozinke(this.nastavnik.lozinka)){
      for (let i = 0; i < this.predmetiSelektovani.length; i++) {
        const element = this.predmetiSelektovani[i];
        if(element === true){
          this.nastavnik.predmeti.push(this.odobreniPredmeti[i].ime)
        }
      }

      for (let i = 0; i < this.uzrastSelektovani.length; i++) {
        const element = this.uzrastSelektovani[i];
        if(element === true){
          if (i === 0) {
            this.nastavnik.uzrast.push("osnovna skola 1-4. razred")
          } else if (i === 1) {
            this.nastavnik.uzrast.push("osnovna skola 5-8. razred")
          } else if (i === 2) {
            this.nastavnik.uzrast.push("srednja skola")
          }
        }
      }

      if(this.nastavnik.korisnickoIme===""||this.nastavnik.pitanje===""||this.nastavnik.odgovor===""||this.nastavnik.ime===""||this.nastavnik.prezime===""||this.nastavnik.pol===""||this.nastavnik.adresa===""||this.nastavnik.telefon===""||this.nastavnik.email===""){
        this.poruka="Sva polja moraju biti popunjena."
        return;
      }

      if(this.nastavnik.slika==="") this.nastavnik.slika="/assets/profile.jpg";
      this.nastavnik.lozinka=this.encryptPassword(this.nastavnik.lozinka);
      this.nastavnikServis.registracija(this.nastavnik).subscribe(
        (resp)=>{
          if(resp['poruka'] === "Korisnink sa tim korisnickim imenom vec postoji."){
            this.poruka = resp['poruka']
          }else if(resp['poruka'] === "Korisnink sa tom e-mail adresom vec postoji."){
            this.poruka = resp['poruka']
          }else{
            if(this.nestoDrugo!=""){
              this.nastavnikServis.kreirajZahtevZaNoviPredmet(this.nestoDrugo).subscribe(resp=>{})
            }
            this.router.navigate([''])
          }
        }
      )
    }else{
      this.poruka="Lozinka nije u ocekivanom formatu.\nMimimalno 6 karaktera, maksimalno 10 karaktera, bar 1 veliko slovo, tri mala slova, jedan broj i jedan specijalni karakter i mora pocinjati velikim slovom."
    }
  }



}
