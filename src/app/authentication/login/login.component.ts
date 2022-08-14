import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Login} from "../../store/models/auth";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {Observable} from "rxjs";
import {LoginAction} from "../../store/actions/auth.action";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading$ !: Observable<boolean>;
  error$ !: Observable<Error | undefined>;

  constructor(private formBuilder: FormBuilder,
              private store: Store<AppState>) {

    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
      ]]
    })
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(store => store.auth.loading);
    this.error$ = this.store.select(store => store.auth.error);
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  isFieldValid(name: string) {
    const field = this.loginForm.get(name) as FormControl;
    return (field.valid && (field.touched || field.dirty))
  }

  login() {
    const cmd: Login = {
      userName: this.username.value,
      userPass: this.password.value
    }

    this.store.dispatch(new LoginAction(cmd));
  }
}
