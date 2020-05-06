import { ModalService } from './detalhe-morador/modal.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MoradorService } from './morador.service';
import { Component, OnInit } from '@angular/core';
import { Morador } from './morador';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-morador',
  templateUrl: './morador.component.html',
  styleUrls: ['./morador.component.css']
})
export class MoradorComponent implements OnInit {

  moradores: Morador[] = [];
  paginador: any;
  moradorSelecionado: Morador;

  constructor(private moradorService: MoradorService, private modalService: ModalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  this.activatedRoute.paramMap.subscribe( params => {
    let page: number = +params.get('page');

    if (!page){
      page = 0;
    }

    this.moradorService.getMoradores(page)
    .pipe(
      tap(response => {
        (response.content as Morador[]).forEach(morador => {
        });
      })
    ).subscribe(response => {
      this.moradores = response.content as Morador[];
      this.paginador = response;
    });
    });
  }

  delete(morador: Morador): void{
    Swal.fire({
      title: 'Excluir',
      text: `Deseja excluir morador(a) ${morador.nome}?` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.value) {
        this.moradorService.delete(morador.id)
        .subscribe(response => {
          this.moradores = this.moradores.filter(mora => mora !== morador);
          Swal.fire(
            'Excluído!',
            `Morador(a) ${morador.nome} excluído com sucesso`,
            'success'
          );
        });
      }
    });
  }

  abrirModal(morador: Morador){
    this.moradorSelecionado = morador;
    this.modalService.abrirModal();
  }
}
