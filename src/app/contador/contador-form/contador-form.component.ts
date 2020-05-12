import { ContadorService } from '.././contador.service';
import { Contador } from '.././contador';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contador-form',
  templateUrl: './contador-form.component.html',
  styleUrls: ['./contador-form.component.css']
})
export class ContadorFormComponent implements OnInit {

  contador: Contador = new Contador();

  constructor(private contadorService: ContadorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadContador();
  }

  loadContador(): void{
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id){
        this.contadorService.getContador(id).subscribe((contador) => this.contador = contador);
      }
    });
  }

  create(): void{
    this.contadorService.create(this.contador)
    .subscribe(contador => {
      this.router.navigate(['/contador']);

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: `Contador ${contador.nome} salvo com sucesso`
      });
    });
  }

  update(): void {
    this.contadorService.update(this.contador)
    .subscribe(contador => {
      this.router.navigate(['/contador']);

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: `contador ${contador.nome} atualizado com sucesso`
      });
    });
  }

}
