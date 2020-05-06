import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { Usuario } from './usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  authRequest: any = {
    user: 'admin',
    senha: 'admin'
  }

  constructor(private loginService: LoginService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.getAccessToken(this.authRequest);
   }

  getAccessToken(authRequest){
    const resp = this.loginService.generateToken(authRequest);
    resp.subscribe(data => console.log('Token: ' + data));
  }



}
