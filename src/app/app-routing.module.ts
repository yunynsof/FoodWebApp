import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component'
import { PedidosComponent } from './shared/components/pedidos/pedidos.component'
import { PagarComponent } from './shared/components/pagar/pagar.component'
import { RegisterComponent } from './shared/components/register/register.component'
import { RecoverPasswordComponent } from './shared/components/recover-password/recover-password.component'
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component'
import { RecordComponent } from './shared/components/record/record.component'

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'pagar', component: PagarComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recover-password', component: RecoverPasswordComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'record', component: RecordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
