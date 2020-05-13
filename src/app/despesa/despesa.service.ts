import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Despesa } from './despesa';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Contador } from '../contador/contador';
import { TipoDespesa } from './tipodespesa';
import { formatDate, formatCurrency } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  private urlEndPoint = 'http://localhost:8080/api/despesas';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean{
    if (e.status === 401 || e.status === 403){
      this.router.navigate(['/login']);
      return true;
  }
  return false;
}

getTipoDespesa(): Observable<TipoDespesa[]>{
  return this.http.get<TipoDespesa[]>(this.urlEndPoint + '/tipodespesas');
}

  getCharts():Observable<Despesa[]>{
    return this.http.get<Despesa[]>(this.urlEndPoint).pipe(
      map( result => result)
    )
  }
  
  getDespesas(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Despesa[]).forEach(despesa => {

        });
      }),
      map( (response: any) => {
        (response.content as Despesa[]).map(despesa => {
          despesa.data = formatDate(despesa.data, 'dd/MM/yyyy', 'pt-br')
          return despesa;
        });
        return response;
      })
    );
  }


  create(despesa: Despesa): Observable<Despesa>{
  return this.http.post(this.urlEndPoint, despesa, {headers: this.httpHeaders}).pipe(
    map((response: any) => response.despesa as Despesa),
    catchError( e => {
      if (this.isNoAutorizado(e)){
        return throwError(e);
      }

      Swal.fire({
        icon: 'error',
        title: 'Erro ao salvar',
        text: e.error.mensagem
      });
      return throwError(e);
    })
  );
  }

  getDespesa(id): Observable<Despesa>{

    return this.http.get<Despesa>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/des']);
        if (this.isNoAutorizado(e)){
          return throwError(e);
        }
        Swal.fire({
          icon: 'error',
          title: 'Erro ao atualizar',
          text: e.error.mensagem
        });

        return throwError(e);
      })
    );
  }

  update(despesa: Despesa): Observable<Despesa>{
    return this.http.put(`${this.urlEndPoint}/${despesa.id}`, despesa, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.despesa as Despesa),
      catchError( e => {

        if (this.isNoAutorizado(e)){
          return throwError(e);
        }

        Swal.fire({
          icon: 'error',
          title: 'Erro ao atualizar',
          text: e.error.mensagem
        });
        return throwError(e);
      })
    );
  }

  delete(id): Observable<Despesa>{
    return this.http.delete<Despesa> (`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        if (this.isNoAutorizado(e)){
          return throwError(e);
        }
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir',
          text: e.error.mensagem
        });
        return throwError(e);
      })
    );
  }

  uploadFoto(arquivo: File, id): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload/`, formData, {
      reportProgress: true
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
