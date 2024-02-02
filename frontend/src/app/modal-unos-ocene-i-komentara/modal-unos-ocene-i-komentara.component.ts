import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-unos-ocene-i-komentara',
  templateUrl: './modal-unos-ocene-i-komentara.component.html',
  styleUrls: ['./modal-unos-ocene-i-komentara.component.css']
})
export class ModalUnosOceneIKomentaraComponent {
  komentar: string = "";
  ocena: number = 1;
  prikaziModal: boolean = false;
  ratings: number[] = [1, 2, 3, 4, 5];

  @Output() modalClosed = new EventEmitter<{ komentar: string; ocena: number }>();

  otvoriModal() {
    this.prikaziModal = true;
  }

  zatvoriModal() {
    this.prikaziModal = false;
  }

  posaljiPodatke() {
    this.modalClosed.emit({ komentar: this.komentar, ocena: this.ocena });
    this.komentar = '';
    this.ocena = 1;
    this.zatvoriModal();
  }
}
