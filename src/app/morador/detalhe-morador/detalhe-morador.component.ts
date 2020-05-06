import Swal from 'sweetalert2';
import { MoradorService } from './../morador.service';
import { Component, OnInit, Input } from '@angular/core';
import { Morador } from '../morador';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-detalhe-morador',
  templateUrl: './detalhe-morador.component.html',
  styleUrls: ['./detalhe-morador.component.css']
})
export class DetalheMoradorComponent implements OnInit {

   @Input() morador: Morador;
   fotoSelecionada: File;
   progresso = 0;

  constructor( private moradorService: MoradorService, public modalService: ModalService) { }

  ngOnInit(): void { }

  selecionarFoto(event){
    this.fotoSelecionada = event.target.files[0];
    this.progresso = 0;
    if (this.fotoSelecionada.type.indexOf('image') < 0){
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: `Deve ser selecionada uma imagem válida`
      });
      this.fotoSelecionada = null;
    }
  }

  uploadFoto(){
    if (!this.fotoSelecionada){
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: `Selecione uma imagem`
      });
    }else{

    this.moradorService.uploadFoto(this.fotoSelecionada, this.morador.id)
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        this.progresso = Math.round((event.loaded / event.total) * 100);
      }else if (event.type === HttpEventType.Response) {
        const response: any = event.body;
        this.morador = response.morador as Morador;

        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Foto salva com sucesso'
        });
      }
    });
  }
  }

  fecharModal(){
    this.modalService.fecharModal();
    this.fotoSelecionada = null;
    this.progresso = 0;
  }
}
