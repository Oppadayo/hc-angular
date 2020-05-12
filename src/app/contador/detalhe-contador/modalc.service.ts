import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalcService {

  modal = false;

  constructor() { }

  abrirModal(){
    this.modal = true;
  }

  fecharModal(){
    this.modal = false;
  }
}
