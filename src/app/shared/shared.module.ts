import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PagarComponent } from './components/pagar/pagar.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecordComponent } from './components/record/record.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    PedidosComponent,
    PagarComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    UserProfileComponent,
    RecordComponent,

  ],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ]
})
export class SharedModule { }
