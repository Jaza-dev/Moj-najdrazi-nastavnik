import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Admin } from '../models/admin';
import { NastavnikService } from '../services/nastavnik.service';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminServis:AdminService, private nastavnikServis:NastavnikService){}

  admin:Admin = null;
  chart: any;
  lineChart: any;
  sviPredmetiINastavnici:any[]=[];
  sviUzrastiINastavnici:any[]=[];
  sviPoloviINastavnici:any[]=[];
  sviPoloviIUcenici:any[]=[];
  sviCasoviPoDanim:any[]=[];
  brojCasovaPoMesecu:any[]=[];
  brojCasovaPreIPoslePodne:any[]=[];
  brojCasovaPoTipuSkole:any[]=[];
  poruka:string = "";

  ngOnInit(): void {
    this.admin = JSON.parse(sessionStorage.getItem("korisnik"));
    this.dohvatiSvePredmeteINastavnike();
    this.dohvatiSveUzrasteINastavnike();
    this.dohvatiSvePoloveINastavnike();
    this.dohvatiSvePoloveIUcenike();
    this.dohvatiSveCasovePoDanima();
    this.dohvatiBrojCasovaPoMesecu();
    this.dohvatiBrojCasovaPreIPoslePodne();
    this.dohvatiBrojCasovaPoTipuSkole();
  }

  dohvatiBrojCasovaPoTipuSkole(){
    this.adminServis.dohvatiBrojCasovaPoTipuSkole().subscribe(
      (resp)=>{
        this.brojCasovaPoTipuSkole=resp['poruka']
        this.pitaBrojaCasovaPoTipuSkole();
      }
    )
  }

  dohvatiBrojCasovaPreIPoslePodne(){
    this.adminServis.dohvatiBrojCasovaPreIPoslePodne().subscribe(
      (resp)=>{
        this.brojCasovaPreIPoslePodne=resp['poruka']
        this.pitaBrojaCasovaPreIPoslePodne();
      }
    )
  }

  dohvatiBrojCasovaPoMesecu(){
    this.adminServis.dohvatiBrojCasovaPoMesecu().subscribe(
      (resp)=>{
        this.brojCasovaPoMesecu=resp['poruka']
        this.dijagramLinijaBrojCasova();
      }
    )
  }

  dohvatiSveCasovePoDanima(){
    this.adminServis.dohvatiSveCasovePoDanima().subscribe(
      (resp)=>{
        this.sviCasoviPoDanim=resp['poruka']
        this.histogramCasoviPoDanima();
      }
    )
  }

  dohvatiSvePoloveINastavnike(){
    this.adminServis.dohvatiSvePoloveINastavnike().subscribe(
      (resp)=>{
        this.sviPoloviINastavnici=resp['poruka']
        this.pitaBrojNastavnikaPoPolu();
      }
    )
  }

  dohvatiSvePoloveIUcenike(){
    this.adminServis.dohvatiSvePoloveIUcenike().subscribe(
      (resp)=>{
        this.sviPoloviIUcenici=resp['poruka']
        this.pitaBrojUcenikPoPolu();
      }
    )
  }

  dohvatiSvePredmeteINastavnike(){
    this.nastavnikServis.dohvatiSvePredmeteINastavnike().subscribe(
      (resp)=>{
        this.sviPredmetiINastavnici=resp['poruka']
        this.dijagramBrojNastavnikaPoPredmetu();
      }
    )
  }

  dohvatiSveUzrasteINastavnike(){
    this.adminServis.dohvatiSveUzrasteINastavnike().subscribe(
      (resp)=>{
        this.sviUzrastiINastavnici=resp['poruka']
        this.dijagramBrojNastavnikaPoUzrastu();
      }
    )
  }

  dijagramBrojNastavnikaPoPredmetu() {

    let data = [];
    this.sviPredmetiINastavnici.forEach(predmet=>{
      data.push({predmet:predmet.predmet, number:predmet.nastavnici.length})
    });

    const labels = data.map(item => item.predmet);
    const values = data.map(item => item.number);

    this.chart = new Chart('dijagramBrojNastavnikaPoPredmetu', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            label: 'Broj nastavnika po predmetu',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            },
          }
        }
      }
    });
  }

  dijagramBrojNastavnikaPoUzrastu() {

    let data = [];
    this.sviUzrastiINastavnici.forEach(uzrast=>{
      data.push({uzrast:uzrast.uzrast, number:uzrast.nastavnici.length})
    });

    const labels = data.map(item => item.uzrast);
    const values = data.map(item => item.number);

    this.chart = new Chart('dijagramBrojNastavnikaPoUzrast', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            label: 'Broj nastavnika po uzrastu',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            },
          }
        }
      }
    });
  }

  pitaBrojNastavnikaPoPolu() {

    let data = [];
    this.sviPoloviINastavnici.forEach(pol=>{
      data.push({pol:pol.pol, number:pol.nastavnici.length})
    });

    const labels = data.map(item => item.pol);
    const values = data.map(item => item.number);

    this.chart = new Chart('dijagramBrojNastavnikaPoPolu', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(192, 75, 192, 0.5)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 75, 192, 1)'],
            borderWidth: 1
          }
        ]
      }
    });
  }

  pitaBrojUcenikPoPolu() {

    let data = [];
    this.sviPoloviIUcenici.forEach(pol=>{
      data.push({pol:pol.pol, number:pol.ucenici.length})
    });

    const labels = data.map(item => item.pol);
    const values = data.map(item => item.number);

    this.chart = new Chart('dijagramBrojUcenikPoPolu', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(192, 75, 192, 0.5)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 75, 192, 1)'],
            borderWidth: 1
          }
        ]
      }
    });
  }

  histogramCasoviPoDanima(){
    let data = [];
    this.sviCasoviPoDanim.forEach(dan=>{
      data.push({dan:dan.dan, prosecanBroj:dan.prosecanBroj})
    });

    const labels = data.map(item => item.dan);
    const values = data.map(item => item.prosecanBroj);

    this.chart = new Chart('histogramCasovaPoDanu', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            label: 'Procenat odrzanih casova',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  dijagramLinijaBrojCasova(){
    const ctx = document.getElementById('dijagramLinijaBrojCasova') as HTMLCanvasElement;
    const labels = [
      'januar', 'februar', 'mart', 'april', 'maj', 'jun',
      'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'
    ];

    const datasets = this.brojCasovaPoMesecu.map(({ nastavnik, brojCasovaPoMesecu }) => {
      const casovi = brojCasovaPoMesecu.map(({ brojCasova }) => brojCasova);
      return {
        label: nastavnik,
        data: casovi,
        fill: false,
        borderColor: this.getRandomColor(),
        tension: 0.4
      };
    });

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Broj casova'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Mesec'
            }
          }
        }
      }
    });
  }

  pitaBrojaCasovaPreIPoslePodne(){

    const labels = this.brojCasovaPreIPoslePodne.map(item => item.doba);
    const values = this.brojCasovaPreIPoslePodne.map(item => item.brojCasova);

    this.chart = new Chart('pitaBrojaCasovaPreIPoslePodne', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: ['rgba(50, 170, 240, 0.5)', 'rgba(240, 170, 50, 0.5)'],
            borderColor: ['rgba(50, 170, 240, 1)', 'rgba(240, 170, 50, 1)'],
            borderWidth: 1
          }
        ]
      }
    });
  }

  pitaBrojaCasovaPoTipuSkole(){

    const labels = this.brojCasovaPoTipuSkole.map(item => item.skola);
    const values = this.brojCasovaPoTipuSkole.map(item => item.brojCasova);

    this.chart = new Chart('pitaBrojCasovaPoTipuSkole', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: ['rgba(50, 50, 255, 0.5)', 'rgba(240, 50, 50, 0.5)','rgba(100, 170, 80, 0.5)','rgba(130, 180, 240, 0.5)'],
            borderColor: ['rgba(50, 50, 255, 1)', 'rgba(240, 50, 50, 1)','rgba(100, 170, 80, 1)','rgba(130, 180, 240, 1)'],
            borderWidth: 1
          }
        ]
      }
    });
  }
}
