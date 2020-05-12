import { SindicoService } from '.././sindico.service';
import { Sindico } from '.././sindico';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-sindico',
  templateUrl: './form-sindico.component.html',
  styleUrls: ['./form-sindico.component.css']
})
export class FormSindicoComponent implements OnInit {

  sindico: Sindico = new Sindico();

  constructor(private sindicoService: SindicoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadSindico();
  }

  loadSindico(): void{
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id){
        this.sindicoService.getSindico(id).subscribe((sindico) => this.sindico = sindico);
      }
    });
  }

  create(): void{
    this.sindicoService.create(this.sindico)
    .subscribe(sindico => {
      this.router.navigate(['/sindico']);

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: `Sindico ${sindico.nome} salvo com sucesso`
      });
    });
  }

  update(): void {
    this.sindicoService.update(this.sindico)
    .subscribe(sindico => {
      this.router.navigate(['/sindico']);

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: `Sindico ${sindico.nome} atualizado com sucesso`
      });
    });
  }

}
