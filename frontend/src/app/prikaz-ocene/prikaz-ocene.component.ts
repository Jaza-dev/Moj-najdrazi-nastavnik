import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prikaz-ocene',
  templateUrl: './prikaz-ocene.component.html',
  styleUrls: ['./prikaz-ocene.component.css']
})
export class PrikazOceneComponent implements OnInit {

  @Input() ocena:number = 0.0;
  zvezde:string[]=[];
  puneZvezde:number = 0;
  poluZvezde:number = 0;
  prazneZvezde:number = 0;

  ngOnInit(): void {
    if(this.ocena!==undefined){
      this.puneZvezde = Math.floor(this.ocena);
      this.poluZvezde = Math.ceil(this.ocena - this.puneZvezde)
      this.prazneZvezde = 5 - Math.ceil(this.ocena);
    }
  }

  getRange(count: number): number[] {
    return Array(count).fill(0).map((x, i) => i);
  }


}
