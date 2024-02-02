import { Component, Input, OnInit } from '@angular/core';
import { Nastavnik } from '../models/nastavnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nastavnik-navigacija',
  templateUrl: './nastavnik-navigacija.component.html',
  styleUrls: ['./nastavnik-navigacija.component.css']
})
export class NastavnikNavigacijaComponent implements OnInit {

  constructor(private router:Router){}

  @Input() nastavnik:Nastavnik;

  ngOnInit(): void {
    if(this.nastavnik===null){
      sessionStorage.clear();
      this.router.navigate([""])
    }
  }

  odjava(){
    sessionStorage.clear();
    this.router.navigate([""])
  }

}
