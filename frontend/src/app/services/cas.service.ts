import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CasService {

  constructor(private http: HttpClient) { }

  uri:string = 'http://localhost:4000';

  dohvatibrojOdrzanihCasovaNedelja(){
    return this.http.get(`${this.uri}/cas/brojOdrzanihCasovaNedelja`)
  }

  dohvatiBrojOdrzanihCasovaMesec(){
    return this.http.get(`${this.uri}/cas/brojOdrzanihCasovaMesec`)
  }

}
