import { MoradorService } from './morador.service';
import { Morador } from './morador';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-morador',
  templateUrl: './form-morador.component.html',
  styleUrls: ['./form-morador.component.css']
})
export class FormMoradorComponent implements OnInit {

  morador: Morador = new Morador();

  constructor(private moradorService: MoradorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadMorador();
  }

  loadMorador(): void{
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id){
        this.moradorService.getMorador(id).subscribe((morador) => this.morador = morador);
      }
    });
  }

  create(): void{
    this.moradorService.create(this.morador)
    .subscribe(morador => {
      this.router.navigate(['/morador']);

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: `Morador ${morador.nome} salvo com sucesso`
      });
    });
  }

  update(): void {
    this.moradorService.update(this.morador)
    .subscribe(morador => {
      this.router.navigate(['/morador']);

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: `Morador ${morador.nome} atualizado com sucesso`
      });
    });
  }
}
