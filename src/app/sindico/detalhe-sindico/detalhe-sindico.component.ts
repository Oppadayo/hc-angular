import Swal from 'sweetalert2';
import { SindicoService } from './../sindico.service';
import { Component, OnInit, Input } from '@angular/core';
import { Sindico } from '../sindico';
import { HttpEventType } from '@angular/common/http';
import { ModalsService } from './modals.service';

@Component({
  selector: 'app-detalhe-sindico',
  templateUrl: './detalhe-sindico.component.html',
  styleUrls: ['./detalhe-sindico.component.css']
})
export class DetalheSindicoComponent implements OnInit {

  @Input() sindico: Sindico;
   fotoSelecionada: File;
   progresso = 0;

  constructor( private sindicoService: SindicoService, public modalsService: ModalsService) { }

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

    this.sindicoService.uploadFoto(this.fotoSelecionada, this.sindico.id)
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        this.progresso = Math.round((event.loaded / event.total) * 100);
      }else if (event.type === HttpEventType.Response) {
        const response: any = event.body;
        this.sindico = response.sindico as Sindico;

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
    this.modalsService.fecharModal();
    this.fotoSelecionada = null;
    this.progresso = 0;
  }

}
