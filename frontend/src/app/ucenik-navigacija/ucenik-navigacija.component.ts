import { Component, Input, OnInit } from '@angular/core';
import { Ucenik } from '../models/ucenik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ucenik-navigacija',
  templateUrl: './ucenik-navigacija.component.html',
  styleUrls: ['./ucenik-navigacija.component.css']
})
export class UcenikNavigacijaComponent implements OnInit{

  constructor(private router:Router){}

  ngOnInit(): void {
    if(this.ucenik===null){
      sessionStorage.clear();
      this.router.navigate([""])
    }
  }

  @Input() ucenik:Ucenik;

  odjava(){
    sessionStorage.clear();
    this.router.navigate([""])
  }
}
