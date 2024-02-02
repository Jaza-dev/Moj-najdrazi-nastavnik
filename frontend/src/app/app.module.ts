import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UcenikComponent } from './ucenik/ucenik.component';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { AdminPrijavaComponent } from './admin-prijava/admin-prijava.component';
import { AdminComponent } from './admin/admin.component';
import { RegistracijaUcenikComponent } from './registracija-ucenik/registracija-ucenik.component';
import { RegistracijaNastavnikComponent } from './registracija-nastavnik/registracija-nastavnik.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { GostComponent } from './gost/gost.component';
import { UcenikDetaljiNastavnikaComponent } from './ucenik-detalji-nastavnika/ucenik-detalji-nastavnika.component';
import { UcenikArhivaCasovaComponent } from './ucenik-arhiva-casova/ucenik-arhiva-casova.component';
import { NastavnikCasoviComponent } from './nastavnik-casovi/nastavnik-casovi.component';
import { NastavnikMojiUceniciComponent } from './nastavnik-moji-ucenici/nastavnik-moji-ucenici.component';
import { NastavnikUcenikDosijeDetaljnijeComponent } from './nastavnik-ucenik-dosije-detaljnije/nastavnik-ucenik-dosije-detaljnije.component';
import { UcenikNavigacijaComponent } from './ucenik-navigacija/ucenik-navigacija.component';
import { NastavnikNavigacijaComponent } from './nastavnik-navigacija/nastavnik-navigacija.component';
import { UcenikPrikazNastavnikaComponent } from './ucenik-prikaz-nastavnika/ucenik-prikaz-nastavnika.component';
import { AdminUceniciComponent } from './admin-ucenici/admin-ucenici.component';
import { AdminNastavniciComponent } from './admin-nastavnici/admin-nastavnici.component';
import { AdminNavigacijaComponent } from './admin-navigacija/admin-navigacija.component';
import { AdminZahteviComponent } from './admin-zahtevi/admin-zahtevi.component';
import { AdminPredmetiComponent } from './admin-predmeti/admin-predmeti.component';
import { ZaboravljenaLozinkaComponent } from './zaboravljena-lozinka/zaboravljena-lozinka.component';
import { PrikazOceneComponent } from './prikaz-ocene/prikaz-ocene.component';
import { ModalUnosOceneIKomentaraComponent } from './modal-unos-ocene-i-komentara/modal-unos-ocene-i-komentara.component';
import { UcenikObavestenjaComponent } from './ucenik-obavestenja/ucenik-obavestenja.component'
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    UcenikComponent,
    NastavnikComponent,
    AdminPrijavaComponent,
    AdminComponent,
    RegistracijaUcenikComponent,
    RegistracijaNastavnikComponent,
    PromenaLozinkeComponent,
    GostComponent,
    UcenikDetaljiNastavnikaComponent,
    UcenikArhivaCasovaComponent,
    NastavnikCasoviComponent,
    NastavnikMojiUceniciComponent,
    NastavnikUcenikDosijeDetaljnijeComponent,
    UcenikNavigacijaComponent,
    NastavnikNavigacijaComponent,
    UcenikPrikazNastavnikaComponent,
    AdminUceniciComponent,
    AdminNastavniciComponent,
    AdminNavigacijaComponent,
    AdminZahteviComponent,
    AdminPredmetiComponent,
    ZaboravljenaLozinkaComponent,
    PrikazOceneComponent,
    ModalUnosOceneIKomentaraComponent,
    UcenikObavestenjaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
