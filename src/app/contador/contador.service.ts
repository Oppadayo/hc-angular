import { Router } from '@angular/router';
import { Contador } from './contador';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ContadorService {

  private urlEndPoint = 'http://localhost:8080/api/contadores';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean{
    if (e.status === 401 || e.status === 403){
      this.router.navigate(['/login']);
      return true;
  }
  return false;
}


  getContadores(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Contador[]).forEach(contador => {

        });
      }),
      map( (response: any) => {
        (response.content as Contador[]).map(contador => {
          return contador;
        });
        return response;
      })
    );
  }


  create(contador: Contador): Observable<Contador>{
  return this.http.post(this.urlEndPoint, contador, {headers: this.httpHeaders}).pipe(
    map((response: any) => response.contador as Contador),
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

  getContador(id): Observable<Contador>{

    return this.http.get<Contador>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/contador']);
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

  update(contador:Contador): Observable<Contador>{
    return this.http.put(`${this.urlEndPoint}/${contador.id}`, contador, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.contador as Contador),
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

  delete(id): Observable<Contador>{
    return this.http.delete<Contador> (`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
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
