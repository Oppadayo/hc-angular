import { Component, OnInit, Input, NgModule, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginadorc',
  templateUrl: './paginadorc.component.html',
  styleUrls: ['./paginadorc.component.css']
})
export class PaginadorcComponent implements OnInit {

  @Input() paginador: any;
  paginas: number[];
  desde: number;
  ate: number;

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges){
    const paginadorAtualizado = changes['paginador'];

    if (paginadorAtualizado.previousValue){
      this.initPaginator();
    }
  }

  private initPaginator(): void{
    this.desde = Math.min(Math.max(1, this.paginador.number - 5), this.paginador.totalPages - 6);
    this.ate = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 5), 7);

    if (this.paginador.totalPages > 5){
      this.paginas = new Array(this.ate - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    }else{
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }

    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }

}
