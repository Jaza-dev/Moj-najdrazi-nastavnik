import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-admin-navigacija',
  templateUrl: './admin-navigacija.component.html',
  styleUrls: ['./admin-navigacija.component.css']
})
export class AdminNavigacijaComponent implements OnInit {
  constructor(private router:Router){}

  @Input() admin:Admin;

  ngOnInit(): void {
    if(this.admin===null){
      sessionStorage.clear();
      this.router.navigate(["adminPrijava"])
    }
  }

  odjava(){
    sessionStorage.clear();
    this.router.navigate(["adminPrijava"])
  }
}
