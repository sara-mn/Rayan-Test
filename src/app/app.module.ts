import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgrxModule} from "./store/ngrx.module";
import {HttpClientModule} from "@angular/common/http";
import {DataListComponent} from './components/Rayan/data-list/data-list.component';
import {AddDataComponent} from './components/Rayan/add-data/add-data.component';
import {MaterialModule} from "./modules/material.module";
import {GridComponent} from "./component-directives/grid/grid.component";
import {LoginComponent} from './authentication/login/login.component'
import {ReactiveFormsModule , FormsModule} from "@angular/forms";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorMessagesDirective } from './directives/error.messages.directive';

@NgModule({
  declarations: [
    AppComponent,
    DataListComponent,
    AddDataComponent,
    GridComponent,
    LoginComponent,
    DashboardComponent,
    ErrorMessagesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgrxModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
