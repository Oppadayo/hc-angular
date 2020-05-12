import { Component, OnInit, Input } from '@angular/core';
import { Despesa } from '../despesa';
import { DespesaService } from '../despesa.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-form-despesa',
  templateUrl: './form-despesa.component.html',
  styleUrls: ['./form-despesa.component.css']
})
export class FormDespesaComponent implements OnInit {

  despesa: Despesa = new Despesa();

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

}
