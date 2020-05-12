import Swal from 'sweetalert2';
import { ContadorService } from './../contador.service';
import { Component, OnInit, Input } from '@angular/core';
import { Contador } from '../contador';
import { HttpEventType } from '@angular/common/http';
import { ModalcService } from './modalc.service';

@Component({
  selector: 'app-detalhe-contador',
  templateUrl: './detalhe-contador.component.html',
  styleUrls: ['./detalhe-contador.component.css']
})
export class DetalheContadorComponent implements OnInit {

  @Input() contador: Contador;
  fotoSelecionada: File;
  progresso = 0;

 constructor( private contadorService: ContadorService, public modalcService: ModalcService) { }

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

   this.contadorService.uploadFoto(this.fotoSelecionada, this.contador.id)
   .subscribe(event => {
     if (event.type === HttpEventType.UploadProgress){
       this.progresso = Math.round((event.loaded / event.total) * 100);
     }else if (event.type === HttpEventType.Response) {
       const response: any = event.body;
       this.contador = response.contador as Contador;

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
   this.modalcService.fecharModal();
   this.fotoSelecionada = null;
   this.progresso = 0;
 }

}
