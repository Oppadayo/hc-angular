import { Component, OnInit, Input } from '@angular/core';
import { Despesa } from '../despesa';
import { DespesaService } from '../despesa.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { TipoDespesa } from '../tipodespesa';


@Component({
  selector: 'app-form-despesa',
  templateUrl: './form-despesa.component.html',
  styleUrls: ['./form-despesa.component.css']
})
export class FormDespesaComponent implements OnInit {

  despesa: Despesa = new Despesa();
  tipoDespesa: TipoDespesa[]; 
  constructor(private despesaService: DespesaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadDespesa();
  }

  loadDespesa(): void{
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id){
        this.despesaService.getDespesa(id).subscribe((despesa) => this.despesa = despesa);
      }
    });
    this.despesaService.getTipoDespesa().subscribe((tipo) => this.tipoDespesa = tipo)
  }

  create(): void{
    this.despesaService.create(this.despesa)
    .subscribe(despesa => {
      this.router.navigate(['/despesa']);

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: `Despesa ${despesa.nome} salva com sucesso`
      });
    });
  }

  update(): void {
    this.despesaService.update(this.despesa)
    .subscribe(despesa => {
      this.router.navigate(['/despesa']);

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: `Despesa ${despesa.nome} atualizada com sucesso`
      });
    });
  }
   compararTipo(t1:TipoDespesa, t2:TipoDespesa): boolean{
    return t1 === null || t2 === null || t1 === undefined || t2 === undefined ? false : t1.id === t2.id;
   }
}
