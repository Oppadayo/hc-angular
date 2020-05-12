import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModaldService {

  modal = false;

  constructor() { }

  abrirModal(){
    this.modal = true;
  }

  fecharModal(){
    this.modal = false;
  }
}
