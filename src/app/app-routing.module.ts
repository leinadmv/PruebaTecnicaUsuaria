import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './componentes/admin/admin.component';


const routes: Routes = [

  { path: '', redirectTo: 'prueba', pathMatch: 'full'},
  { path: 'prueba', component: AdminComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
