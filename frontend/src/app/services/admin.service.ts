import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri:string = 'http://localhost:4000';

  prijava(korisnickoIme:string, lozinka:string){
    const data = {
      korisnickoIme:korisnickoIme,
      lozinka:lozinka
    }
    return this.http.post(`${this.uri}/admin/prijava`, data);
  }

  dohvatiSveUcenike(){
    return this.http.get(`${this.uri}/admin/dohvatiSveUcenike`);
  }

  dohvatiSveNastavnike(){
    return this.http.get(`${this.uri}/admin/dohvatiSveNastavnike`);
  }

  dohvatiSveZahteve(){
    return this.http.get(`${this.uri}/admin/dohvatiSveZahteve`);
  }

  prihvatiZahtev(korisnickoIme:string){
    const data = {
      korisnickoIme:korisnickoIme
    }
    return this.http.post(`${this.uri}/admin/prihvatiZahtev`, data)
  }

  odbijZahtev(korisnickoIme:string){
    const data = {
      korisnickoIme:korisnickoIme
    }
    return this.http.post(`${this.uri}/admin/odbijZahtev`, data)

  }

  dohvatiSveNeodobrenePredmete(){
    return this.http.get(`${this.uri}/admin/dohvatiSveNeodobrenePredmete`);
  }

  odobriPredmet(_id:string){
    const data = {
      _id:_id
    }

    return this.http.post(`${this.uri}/admin/odobriPredmet`, data);
  }

  odbijPredmet(_id:string){
    const data = {
      _id:_id
    }
    return this.http.post(`${this.uri}/admin/odbijPredmet`, data);
  }

  kreirajPredmet(ime:string){
    const data = {
      ime:ime
    }
    return this.http.post(`${this.uri}/admin/kreirajPredmet`, data);
  }

  dohvatiSveUzrasteINastavnike(){
    return this.http.get(`${this.uri}/admin/dohvatiSveUzrasteINastavnike`);
  }

  dohvatiSvePoloveINastavnike(){
    return this.http.get(`${this.uri}/admin/dohvatiSvePoloveINastavnike`);
  }

  dohvatiSvePoloveIUcenike(){
    return this.http.get(`${this.uri}/admin/dohvatiSvePoloveIUcenike`);
  }

  dohvatiSveCasovePoDanima(){
    return this.http.get(`${this.uri}/admin/dohvatiSveCasovePoDanima`);
  }

  dohvatiBrojCasovaPoMesecu(){
    return this.http.get(`${this.uri}/admin/brojOdrzanihCasovaPoMesecu`);
  }

  dohvatiBrojCasovaPreIPoslePodne(){
    return this.http.get(`${this.uri}/admin/dohvatiBrojCasovaPreIPoslePodne`);
  }

  dohvatiBrojCasovaPoTipuSkole(){
    return this.http.get(`${this.uri}/admin/dohvatiBrojCasovaPoTipuSkole`);
  }

  deaktivirajNastavnika(korisnickoIme:string){
    const data = {
      korisnickoIme:korisnickoIme
    }
    return this.http.post(`${this.uri}/admin/deaktivirajNastavnika`, data);
  }

  azurirajNastavnika(korisnickoIme:string, ime:string, prezime:string, adresa:string, telefon:string, email:string){
    const data = {
      korisnickoIme:korisnickoIme,
      ime:ime,
      prezime:prezime,
      adresa:adresa,
      telefon:telefon,
      email:email
    }
    return this.http.post(`${this.uri}/admin/azurirajNastavnika`, data);
  }


}
