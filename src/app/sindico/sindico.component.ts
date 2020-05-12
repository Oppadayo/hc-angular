import { ModalsService } from './detalhe-sindico/modals.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SindicoService } from './sindico.service';
import { Component, OnInit } from '@angular/core';
import { Sindico } from './sindico';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sindico',
  templateUrl: './sindico.component.html',
  styleUrls: ['./sindico.component.css']
})
export class SindicoComponent implements OnInit {

  sindicos: Sindico[];
  paginador: any;
  sindicoSelecionado: Sindico;

  constructor(private sindicoService: SindicoService, private modalsService: ModalsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  this.activatedRoute.paramMap.subscribe( params => {
    let page: number = +params.get('page');

    if (!page){
      page = 0;
    }

    this.sindicoService.getSindicos(page)
    .pipe(
      tap(response => {
        (response.content as Sindico[]).forEach(sindico => {
        });
      })
    ).subscribe(response => {
      this.sindicos = response.content as Sindico[];
      this.paginador = response;
    });
    });
  }

  delete(sindico: Sindico): void{
    Swal.fire({
      title: 'Excluir',
      text: `Deseja excluir sindico(a) ${sindico.nome}?` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.value) {
        this.sindicoService.delete(sindico.id)
        .subscribe(response => {
          this.sindicos = this.sindicos.filter(sindi => sindi !== sindico);
          Swal.fire(
            'Excluído!',
            `Sindico(a) ${sindico.nome} excluído com sucesso`,
            'success'
          );
        });
      }
    });
  }

  abrirModal(sindico: Sindico){
    this.sindicoSelecionado = sindico;
    this.modalsService.abrirModal();
  }

}
