import { LoginService } from './login/login.service';
import { Routes, RouterModule } from '@angular/router';
import { MoradorService } from './morador/morador.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MoradorComponent } from './morador/morador.component';
import { FormMoradorComponent } from './morador/form-morador.component';
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { PaginadormComponent } from './morador/paginadorm/paginadorm.component';
import { DetalheMoradorComponent } from './morador/detalhe-morador/detalhe-morador.component';


registerLocaleData(localePT, 'pt-BR');

const routes: Routes = [
  {path: '', redirectTo: '/morador', pathMatch: 'full'},
  {path: 'morador', component: MoradorComponent},
  {path: 'morador/page/:page', component: MoradorComponent},
  {path: 'morador/form', component: FormMoradorComponent},
  {path: 'morador/form/:id', component: FormMoradorComponent},
  {path: 'login', component: LoginComponent}

];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MoradorComponent,
    FormMoradorComponent,
    PaginadormComponent,
    DetalheMoradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [MoradorService,
    LoginService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
