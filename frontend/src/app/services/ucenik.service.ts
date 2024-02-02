import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ucenik } from '../models/ucenik';

@Injectable({
  providedIn: 'root'
})
export class UcenikService {

  constructor(private http: HttpClient) { }

  uri:string = 'http://localhost:4000';

  prijava(korisnicko_ime:string, lozinka:string){
    const data = {
      korisnickoIme:korisnicko_ime,
      lozinka:lozinka
    }
    return this.http.post(`${this.uri}/ucenik/prijava`, data);
  }

  registracija(ucenik:Ucenik){

    return this.http.post(`${this.uri}/ucenik/registracija`, ucenik);
  }

  brojUcenika(){
    return this.http.get(`${this.uri}/ucenik/brojUcenika`);
  }

  azurirajPodatke(ucenik:Ucenik){
    const data = {
      ucenik:ucenik
    }

    return this.http.post(`${this.uri}/ucenik/azurirajPodatke`, data);
  }

  dohvatiOdrzaneCasove(korisnickoIme:string){
    const data = {
      ucenik:korisnickoIme
    }
    return this.http.post(`${this.uri}/ucenik/odrzaniCasovi`, data)
  }

  dohvatiPredstojeceCasove(korisnickoIme:string){
    const data = {
      ucenik:korisnickoIme
    }
    return this.http.post(`${this.uri}/ucenik/predstojeciCasovi`, data)
  }

  zakaziCasPutemForme(predmetZakazivanje:string, datumZakazivanje:string, opisZakazivanje:string, zelimDodatniCas:boolean, ucenik:string, nastavnik:string, imeUcenika:string, prezimeUcenika){
    let trajanje = zelimDodatniCas ? 2 : 1
    const data = {
      ucenik:ucenik,
      nastavnik:nastavnik,
      predmet:predmetZakazivanje,
      imeUcenika:imeUcenika,
      prezimeUcenika:prezimeUcenika,
      datum:datumZakazivanje,
      opis:opisZakazivanje,
      trajanje:trajanje
    }

    return this.http.post(`${this.uri}/ucenik/zakaziCasPutemForme`, data);
  }

  ostaviOcenuIKomentar(_id:string,komentar:string, ocena:number){

    const data = {
      _id:_id,
      komentar:komentar,
      ocena:ocena
    }

    return this.http.post(`${this.uri}/ucenik/ostaviOcenuIKomentar`, data)

  }

  dohvatiSvaObavestenja(ucenik:string){
    const data = {
      ucenik:ucenik
    }
    return this.http.post(`${this.uri}/ucenik/dohvatiSvaObavestenja`, data);
  }


}
