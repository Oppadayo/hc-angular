import { ModalcService } from './detalhe-contador/modalc.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ContadorService } from './contador.service';
import { Component, OnInit } from '@angular/core';
import { Contador } from './contador';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent implements OnInit {

  contadores: Contador[] = [];
  paginador: any;
  contadorSelecionado: Contador;

  constructor(private contadorService: ContadorService, private modalcService: ModalcService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  this.activatedRoute.paramMap.subscribe( params => {
    let page: number = +params.get('page');

    if (!page){
      page = 0;
    }

    this.contadorService.getContadores(page)
    .pipe(
      tap(response => {
        (response.content as Contador[]).forEach(contador => {
        });
      })
    ).subscribe(response => {
      this.contadores = response.content as Contador[];
      this.paginador = response;
    });
    });
  }

  delete(contador: Contador): void{
    Swal.fire({
      title: 'Excluir',
      text: `Deseja excluir contador(a) ${contador.nome}?` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.value) {
        this.contadorService.delete(contador.id)
        .subscribe(response => {
          this.contadores = this.contadores.filter(conta => conta !== contador);
          Swal.fire(
            'Excluído!',
            `contador(a) ${contador.nome} excluído com sucesso`,
            'success'
          );
        });
      }
    });
  }

  abrirModal(contador: Contador){
    this.contadorSelecionado = contador;
    this.modalcService.abrirModal();
  }

}
