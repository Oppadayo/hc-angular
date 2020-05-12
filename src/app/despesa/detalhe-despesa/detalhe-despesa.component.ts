import Swal from 'sweetalert2';
import { DespesaService } from './../despesa.service';
import { Component, OnInit, Input } from '@angular/core';
import { Despesa } from '../despesa';
import { HttpEventType } from '@angular/common/http';
import { ModaldService } from './modald.service';

@Component({
  selector: 'app-detalhe-despesa',
  templateUrl: './detalhe-despesa.component.html',
  styleUrls: ['./detalhe-despesa.component.css']
})
export class DetalheDespesaComponent implements OnInit {

  @Input() despesa: Despesa;
  fotoSelecionada: File;
  progresso = 0;

 constructor( private despesaService: DespesaService, public modaldService: ModaldService) { }

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

   this.despesaService.uploadFoto(this.fotoSelecionada, this.despesa.id)
   .subscribe(event => {
     if (event.type === HttpEventType.UploadProgress){
       this.progresso = Math.round((event.loaded / event.total) * 100);
     }else if (event.type === HttpEventType.Response) {
       const response: any = event.body;
       this.despesa = response.despesa as Despesa;

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
   this.modaldService.fecharModal();
   this.fotoSelecionada = null;
   this.progresso = 0;
 }

}
