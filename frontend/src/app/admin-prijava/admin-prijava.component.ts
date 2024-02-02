import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-prijava',
  templateUrl: './admin-prijava.component.html',
  styleUrls: ['./admin-prijava.component.css']
})
export class AdminPrijavaComponent {
  constructor(private adminService:AdminService, private router:Router){}

  korisnickoIme:string;
  lozinka:string;
  poruka:string="";

  prijava(){
    this.adminService.prijava(this.korisnickoIme,this.lozinka).subscribe(
      resp=>{
        let admin = resp['poruka'];
        if(admin === null){
          this.poruka="Pogresno korisnicko ime ili lozinka."
        }else{
          sessionStorage.setItem("korisnik", JSON.stringify(admin));
          this.router.navigate(['admin']);
        }
      }
    )
  }
}
