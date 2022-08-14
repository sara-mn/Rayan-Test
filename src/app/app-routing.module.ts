import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DataListComponent} from "./components/Rayan/data-list/data-list.component";
import {AddDataComponent} from "./components/Rayan/add-data/add-data.component";
import {LoginComponent} from "./authentication/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./services/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component : DashboardComponent
  },
  {
    path: 'rayan/list',
    component : DataListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ' rayan/add',
    component: AddDataComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component : LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
