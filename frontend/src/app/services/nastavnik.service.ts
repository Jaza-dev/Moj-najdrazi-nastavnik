import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nastavnik } from '../models/nastavnik';
import { Cas } from '../models/cas';

@Injectable({
  providedIn: 'root'
})
export class NastavnikService {

  constructor(private http: HttpClient) { }

  uri:string = 'http://localhost:4000';

  prijava(korisnicko_ime:string, lozinka:string){
    const data = {
      korisnickoIme:korisnicko_ime,
      lozinka:lozinka
    }
    return this.http.post(`${this.uri}/nastavnik/prijava`, data);
  }

  dohvatiSveOdobrenePredmete(){
    return this.http.get(`${this.uri}/nastavnik/dohvatiSveOdobrenePredmete`);
  }

  registracija(nastavnik:Nastavnik){
    return this.http.post(`${this.uri}/nastavnik/registracija`, nastavnik);
  }

  kreirajZahtevZaNoviPredmet(noviPredmet:string){
    const data = {
      noviPredmet:noviPredmet
    }
    return this.http.post(`${this.uri}/nastavnik/kreirajZahtevZaNoviPredmet`, data);
  }

  brojNastavnika(){
    return this.http.get(`${this.uri}/nastavnik/brojNastavnika`);
  }

  dohvatiSvePredmeteINastavnike(){
    return this.http.get(`${this.uri}/nastavnik/dohvatiSvePredmeteINastavnike`);
  }

  dohvatiOdredjenePredmeteINastavnike(uzrast:string){
    const data = {
      uzrast:uzrast
    }
    return this.http.post(`${this.uri}/nastavnik/dohvatiOdredjenePredmeteINastavnike`, data);
  }

  pretraziNastavnika(imePretraga:string, prezimePretraga:string, predmetPretraga:string, uzrast:string){
    const data = {
      ime:imePretraga,
      prezime:prezimePretraga,
      predmet:predmetPretraga,
      uzrast:uzrast
    }
    return this.http.post(`${this.uri}/nastavnik/pretraziNastavnika`, data)
  }

  azuriraj(korisnickoIme:string,ime:string, prezime:string, adresa:string, telefon:string, email:string, slika:string, predmeti:string[], uzrast:string[]){
    const data = {
      korisnickoIme:korisnickoIme,
      ime:ime,
      prezime:prezime,
      adresa:adresa,
      telefon:telefon,
      email:email,
      slika:slika,
      predmeti:predmeti,
      uzrast:uzrast
    }

    return this.http.post(`${this.uri}/nastavnik/azurirajPodatke`, data);
  }

  dohvatiMojeUcenike(nastavnik:string){
    const data = {
      nastavnik:nastavnik
    }

    return this.http.post(`${this.uri}/nastavnik/dohvatiMojeUcenike`, data);
  }

  dohvatiPetPrvihPotvrdjenihCasova(nastavnik:string){
    const data = {
      nastavnik:nastavnik
    }

    return this.http.post(`${this.uri}/nastavnik/dohvatiPetPrvihPotvrdjenihCasova`, data);
  }


  dohvatiDesetPrvihPotvrdjenihCasova(nastavnik:string){
    const data = {
      nastavnik:nastavnik
    }

    return this.http.post(`${this.uri}/nastavnik/dohvatiDesetPrvihPotvrdjenihCasova`, data);
  }

  dohvatiSvePotvrdjeneCasove(nastavnik:string){
    const data = {
      nastavnik:nastavnik
    }

    return this.http.post(`${this.uri}/nastavnik/dohvatiSvePotvrdjeneCasove`, data);
  }

  dohvatiListuZahteva(nastavnik:string){
    const data = {
      nastavnik:nastavnik
    }
    return this.http.post(`${this.uri}/nastavnik/dohvatiListuZahteva`, data);
  }

  potvrdi(id:string){
    const data = {
      id:id
    }

    return this.http.post(`${this.uri}/nastavnik/potvrdi`, data)
  }

  odbij(id:string, obrazlozenje:string){
    const data = {
      id:id,
      obrazlozenje:obrazlozenje
    }

    return this.http.post(`${this.uri}/nastavnik/odbij`, data)
  }

  ostaviOcenuIKomentar(_id:string,komentar:string,ocena:number){
    const data = {
      _id:_id,
      komentar:komentar,
      ocena:ocena
    }

    return this.http.post(`${this.uri}/nastavnik/ostaviOcenuIKomentar`, data)
  }

  dohvatiProsecneOcene(listaZahteva:Cas[]){
    const data = {
      listaZahteva:listaZahteva
    }

    return this.http.post(`${this.uri}/nastavnik/dohvatiProsecneOcene`, data)
  }

  otkaziCas(id:string, obrazlozenje:string){
    const data = {
      id:id,
      obrazlozenje:obrazlozenje
    }

    return this.http.post(`${this.uri}/nastavnik/otkaziCas`, data)
  }
  dohvatiSveOdrzaneCasove(nastavnik:string){
    const data = {
      nastavnik:nastavnik
    }
    return this.http.post(`${this.uri}/nastavnik/dohvatiSveOdrzaneCasove`, data);
  }
}
