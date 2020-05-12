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
import { DespesaComponent } from './despesa/despesa.component';
import { DespesaService } from './despesa/despesa.service';
import { SindicoComponent } from './sindico/sindico.component';
import { PaginadorsComponent } from './sindico/paginadors/paginadors.component';
import { DetalheSindicoComponent } from './sindico/detalhe-sindico/detalhe-sindico.component';
import { FormSindicoComponent } from './sindico/form-sindico/form-sindico.component';
import { ContadorComponent } from './contador/contador.component';
import { ContadorFormComponent } from './contador/contador-form/contador-form.component';
import { PaginadorcComponent } from './contador/paginadorc/paginadorc.component';
import { DetalheContadorComponent } from './contador/detalhe-contador/detalhe-contador.component';
import { ContadorService } from './contador/contador.service';
import { SindicoService } from './sindico/sindico.service';
import { FormDespesaComponent } from './despesa/form-despesa/form-despesa.component';
import { DetalheDespesaComponent } from './despesa/detalhe-despesa/detalhe-despesa.component';
import { PaginadordComponent } from './despesa/paginadord/paginadord.component';


registerLocaleData(localePT, 'pt-BR');

const routes: Routes = [
  {path: '', redirectTo: '/morador', pathMatch: 'full'},
  {path: 'morador', component: MoradorComponent},
  {path: 'morador/page/:page', component: MoradorComponent},
  {path: 'morador/form', component: FormMoradorComponent},
  {path: 'morador/form/:id', component: FormMoradorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'despesa', component: DespesaComponent},
  {path: 'despesa/form', component: FormDespesaComponent},
  {path: 'despesa/form/:id', component: FormDespesaComponent},
  {path: 'despesa/page/:page', component: DespesaComponent},
  {path: 'sindico', component: SindicoComponent},
  {path: 'sindico/page/:page', component: SindicoComponent},
  {path: 'sindico/form', component: FormSindicoComponent},
  {path: 'sindico/form/:id', component: FormSindicoComponent},
  {path: 'contador', component: ContadorComponent},
  {path: 'contador/page/:page', component: ContadorComponent},
  {path: 'contador/form', component: ContadorFormComponent},
  {path: 'contador/form/:id', component: ContadorFormComponent},

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
    DetalheMoradorComponent,
    DespesaComponent,
    SindicoComponent,
    PaginadorsComponent,
    DetalheSindicoComponent,
    FormSindicoComponent,
    ContadorComponent,
    ContadorFormComponent,
    PaginadorcComponent,
    DetalheContadorComponent,
    FormDespesaComponent,
    DetalheDespesaComponent,
    PaginadordComponent
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
    DespesaService,
    ContadorService,
    SindicoService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
