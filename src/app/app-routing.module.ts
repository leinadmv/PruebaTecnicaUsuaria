import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './componentes/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'prueba', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
