import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {

  @Input()
  modalIsOpen: boolean = false

  @Output()
  modalWindowClose = new EventEmitter

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalWindowClose.emit()
    this.modalIsOpen = false
  }
}
