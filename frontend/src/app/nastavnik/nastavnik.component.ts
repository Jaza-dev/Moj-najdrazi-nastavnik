import { Component, OnInit } from '@angular/core';
import { Nastavnik } from '../models/nastavnik';
import { NastavnikService } from '../services/nastavnik.service';
import { Predmet } from '../models/predmet';

@Component({
  selector: 'app-nastavnik',
  templateUrl: './nastavnik.component.html',
  styleUrls: ['./nastavnik.component.css']
})
export class NastavnikComponent implements OnInit {

  nastavnik:Nastavnik;
  poruka:string = "";
  predmetiSelektovani:boolean[] = [];
  odobreniPredmeti:Predmet[]=[]
  uzrastSelektovani:boolean[] = [];
  predmeti:string[] = [];
  uzrast:string[] = [];

  constructor(private nastavnikServis:NastavnikService){}

  ngOnInit(): void {
    this.nastavnik = JSON.parse(sessionStorage.getItem("korisnik"))
    this.dohvatiSveOdobrenePredmete();
  }

  handleFileUpload(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        this.nastavnik.slika=base64String;
      };

      reader.readAsDataURL(file);
    }
  }

  dohvatiSveOdobrenePredmete(){
    this.nastavnikServis.dohvatiSveOdobrenePredmete().subscribe(
      (resp)=>{
        this.odobreniPredmeti=resp['poruka'];
        this.inicijalizacija();
      }
    )
  }

  inicijalizacija(){
    var j = 0;
    for (let i = 0; i < this.odobreniPredmeti.length; i++) {
      const element = this.nastavnik.predmeti[j];
      if (element === this.odobreniPredmeti[i].ime) {
        this.predmetiSelektovani[i] = true
        ++j;
      }else{
        this.predmetiSelektovani[i] = false
      }
    }

    for (let i = 0; i < this.nastavnik.uzrast.length; i++) {
      const element = this.nastavnik.uzrast[i];
      if (element === "osnovna skola 1-4. razred") {
        this.uzrastSelektovani[0] = true;
      } else if (element === "osnovna skola 5-8. razred") {
        this.uzrastSelektovani[1] = true;
      } else if (element === "srednja skola") {
        this.uzrastSelektovani[2] = true;
      }
    }
  }

  azuriraj(){
    this.predmeti = [];
    for (let i = 0; i < this.predmetiSelektovani.length; i++) {
      const element = this.predmetiSelektovani[i];
      if(element === true){
        this.predmeti.push(this.odobreniPredmeti[i].ime)
      }
    }

    this.uzrast = []
    for (let i = 0; i < this.uzrastSelektovani.length; i++) {
      const element = this.uzrastSelektovani[i];
      if(element === true){
        if (i === 0) {
          this.uzrast.push("osnovna skola 1-4. razred")
        } else if (i === 1) {
          this.uzrast.push("osnovna skola 5-8. razred")
        } else if (i === 2) {
          this.uzrast.push("srednja skola")
        }
      }
    }

    this.nastavnikServis.azuriraj(this.nastavnik.korisnickoIme,this.nastavnik.ime,this.nastavnik.prezime,this.nastavnik.adresa,this.nastavnik.telefon,this.nastavnik.email,this.nastavnik.slika,this.predmeti, this.uzrast).subscribe(
      (resp)=>{
        this.poruka = resp['poruka']
        this.nastavnik.predmeti=this.predmeti
        this.nastavnik.uzrast=this.uzrast
        sessionStorage.setItem("korisnik", JSON.stringify(this.nastavnik))
      }
    )
  }

}
