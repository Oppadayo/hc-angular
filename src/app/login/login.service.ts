import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  generateToken(request){
    return this.http.post('http://localhost:8080/api/authenticate', request, {responseType: 'text' as 'json'});
  }

  welcome(token){
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get('http://localhost:8080/', {headers, responseType: 'text' as 'json'});
  }
}
