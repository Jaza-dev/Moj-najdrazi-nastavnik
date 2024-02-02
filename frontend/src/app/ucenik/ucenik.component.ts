import { Component, OnInit } from '@angular/core';
import { Ucenik } from '../models/ucenik';
import { UcenikService } from '../services/ucenik.service';

@Component({
  selector: 'app-ucenik',
  templateUrl: './ucenik.component.html',
  styleUrls: ['./ucenik.component.css']
})
export class UcenikComponent implements OnInit {

  constructor(private ucenikServis:UcenikService){}

  ucenik:Ucenik;
  poruka:string = "";

  ngOnInit(): void {
    this.ucenik = JSON.parse(sessionStorage.getItem("korisnik"));
  }

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

  azuriraj(){
    let neizmenjenUcenik = JSON.parse(sessionStorage.getItem("korisnik"));
    if(neizmenjenUcenik.razred > this.ucenik.razred){
      if(!(neizmenjenUcenik.tipSkole === "osnovna" && neizmenjenUcenik.tipSkole !== this.ucenik.tipSkole)){
        this.poruka = "Nije dozovoljena preci u nizi razred."
        return;
      }
    }

    if(neizmenjenUcenik.tipSkole !== "osnovna" && this.ucenik.tipSkole === "osnovna"){
      this.poruka = "Nije dozovoljena preci u nizi razred."
      return;
    }

    this.ucenikServis.azurirajPodatke(this.ucenik).subscribe(
      (resp)=>{
        this.poruka = resp['poruka'];
        sessionStorage.setItem("korisnik", JSON.stringify(this.ucenik))
      }
    )
  }


}
