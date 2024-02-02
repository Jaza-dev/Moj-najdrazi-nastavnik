import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrijavaComponent } from './prijava/prijava.component';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { UcenikComponent } from './ucenik/ucenik.component';
import { AdminComponent } from './admin/admin.component';
import { AdminPrijavaComponent } from './admin-prijava/admin-prijava.component';
import { RegistracijaUcenikComponent } from './registracija-ucenik/registracija-ucenik.component';
import { RegistracijaNastavnikComponent } from './registracija-nastavnik/registracija-nastavnik.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { GostComponent } from './gost/gost.component';
import { UcenikDetaljiNastavnikaComponent } from './ucenik-detalji-nastavnika/ucenik-detalji-nastavnika.component';
import { UcenikArhivaCasovaComponent } from './ucenik-arhiva-casova/ucenik-arhiva-casova.component';
import { NastavnikCasoviComponent } from './nastavnik-casovi/nastavnik-casovi.component';
import { NastavnikMojiUceniciComponent } from './nastavnik-moji-ucenici/nastavnik-moji-ucenici.component';
import { NastavnikUcenikDosijeDetaljnijeComponent } from './nastavnik-ucenik-dosije-detaljnije/nastavnik-ucenik-dosije-detaljnije.component';
import { UcenikPrikazNastavnikaComponent } from './ucenik-prikaz-nastavnika/ucenik-prikaz-nastavnika.component';
import { AdminUceniciComponent } from './admin-ucenici/admin-ucenici.component';
import { AdminNastavniciComponent } from './admin-nastavnici/admin-nastavnici.component';
import { AdminZahteviComponent } from './admin-zahtevi/admin-zahtevi.component';
import { AdminPredmetiComponent } from './admin-predmeti/admin-predmeti.component';
import { ZaboravljenaLozinkaComponent } from './zaboravljena-lozinka/zaboravljena-lozinka.component';
import { UcenikObavestenjaComponent } from './ucenik-obavestenja/ucenik-obavestenja.component';

const routes: Routes = [
  {path:"", component:PrijavaComponent},
  {path:"gost", component:GostComponent},
  {path:"ucenik", component:UcenikComponent},
  {path:"nastavnik", component:NastavnikComponent},
  {path:"admin", component:AdminComponent},
  {path:"adminPrijava", component:AdminPrijavaComponent},
  {path:"registracija-ucenik", component:RegistracijaUcenikComponent},
  {path:"registracija-nastavnik", component:RegistracijaNastavnikComponent},
  {path:"promena-lozinke", component:PromenaLozinkeComponent},
  {path:"prikazNastavnika", component:UcenikPrikazNastavnikaComponent},
  {path:"detaljiNastavnika", component:UcenikDetaljiNastavnikaComponent},
  {path:"ucenikArhivaCasova", component:UcenikArhivaCasovaComponent},
  {path:"nastavnikCasovi", component:NastavnikCasoviComponent},
  {path:"mojiUcenici", component:NastavnikMojiUceniciComponent},
  {path:"ucenikDosijeDetaljnije", component:NastavnikUcenikDosijeDetaljnijeComponent},
  {path:"adminUcenici", component:AdminUceniciComponent},
  {path:"adminNastavnici", component:AdminNastavniciComponent},
  {path:"adminZahtevi", component:AdminZahteviComponent},
  {path:"adminPredmeti", component:AdminPredmetiComponent},
  {path:"zaboravljenaLozinka", component:ZaboravljenaLozinkaComponent},
  {path:"ucenikObavestenja", component:UcenikObavestenjaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
