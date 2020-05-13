import { Component, OnInit } from '@angular/core';
import { Despesa } from './despesa';
import { DespesaService } from './despesa.service';
import Chart from 'chart.js';
import { Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ModaldService } from './detalhe-despesa/modald.service';


@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css']
})
export class DespesaComponent implements OnInit {

  despesas: Despesa[];
  chart: [];  
  paginador: any;
  despesaSelecionado: Despesa;
  soma = 0;
  constructor(private despesaService: DespesaService, private modaldService: ModaldService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.despesaService.getCharts()
    .subscribe((res) =>{
   
       const valord = res.map(res => res.valor);
       const datad = res.map(res => res.data);
       const tipod = res.map(res => res.tipoDespesa.tipo)
       const tipoid = res.map(res => res.tipoDespesa.id);
       const reducer = (accumulator, currentValue) => accumulator + currentValue;
       
       if(tipoid[1] == tipoid[1]){
       this.soma = (valord.reduce(reducer))
       }
      console.log(tipod)
              
       this.chart = new Chart('canvas', {
        responsive: true,
        type: 'bar',  
        data: {
          labels: datad,
          datasets: [
            {              
              data: valord,
              backgroundColor	 : '#c0392b',
              fill: false
            },            
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes:[{
               display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
  
      })

      this.chart = new Chart('canvaspie', {
        responsive: true,
        maintainAspectRatio: true,
        type: 'doughnut',  
        data: {
          labels: tipod,
          datasets: [
            {              
              data: valord,
              backgroundColor	 : '#f39c12',
              fill: false
            },                        
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes:[{
               display: false
            }],
            yAxes: [{
              display: false
            }],
            layout:{
              padding:{
                left: 50,
                bottom: 0,
                top: 0,
                right: 0
              }
            }
            
          }
        }
  
      })
    })


    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
  
      if (!page){
        page = 0;
      }
  
      this.despesaService.getDespesas(page)
      .pipe(
        tap(response => {
          (response.content as Despesa[]).forEach(despesa => {
          });
        })
      ).subscribe(response => {
        this.despesas = response.content as Despesa[];
        this.paginador = response;
      });
      });
    
  }

  delete(despesa: Despesa): void{
    Swal.fire({
      title: 'Excluir',
      text: `Deseja excluir despesa ${despesa.nome}?` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.value) {
        this.despesaService.delete(despesa.id)
        .subscribe(response => {
          this.despesas = this.despesas.filter(desp => desp !== despesa);
          Swal.fire(
            'Excluído!',
            `Despesa ${despesa.nome} excluída com sucesso`,
            'success'
          );
        });
      }
    });
  }

  abrirModal(despesa: Despesa){
    this.despesaSelecionado = despesa;
    this.modaldService.abrirModal();
  }
}
