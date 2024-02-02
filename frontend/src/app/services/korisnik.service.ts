import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri:string = 'http://localhost:4000';

  promenaLozinke(korisnickoIme:string, lozinka:string, novaLozinka:string){
    const data = {
      korisnickoIme:korisnickoIme,
      lozinka:lozinka,
      novaLozinka:novaLozinka
    }
    return this.http.post(`${this.uri}/korisnik/promenaLozinke`, data);
  }

  dohvatiKorisnika(korisnickoIme:string){
    const data = {
      korisnickoIme:korisnickoIme
    }
    return this.http.post(`${this.uri}/korisnik/dohvatiKorisnika`, data);
  }

  zaboravljenaLozinka(korisnickoIme:string, novaLozinka:string){
    const data = {
      korisnickoIme:korisnickoIme,
      novaLozinka:novaLozinka
    }
    return this.http.post(`${this.uri}/korisnik/zaboravljenaLozinka`, data);
  }
}
