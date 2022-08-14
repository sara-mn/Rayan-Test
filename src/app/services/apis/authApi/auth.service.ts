import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../../../store/models/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base_url = "http://37.255.223.118:9402";

  constructor(private httpClient: HttpClient) {
  }

  login<T>(data: Login): Observable<T> {
    return this.httpClient.post<T>(`${this.base_url}/api/Auth/login` , data,  {})
  }
}
