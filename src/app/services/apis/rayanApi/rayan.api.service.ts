import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {Rayan} from "../../../store/models/rayan";
import {SortDirection} from "@angular/material/sort";

@Injectable({
  providedIn: 'root'
})
export class RayanApiService {
  base_url = "http://37.255.223.118:9402";

  constructor(private httpClient: HttpClient) {
  }

  getData<T>(sort?: string, order?: SortDirection, page?: number): Observable<T> {
    const options = {
      headers: this.getHeaders(),
    }
    let query: string;
    query = sort ? `?sort=${sort}` : '';
    query += order ? `&order=${order}` : '';
    query += page ? `&page=${page}` : '';

    return this.httpClient.get<T>(`${this.base_url}/api/FolderData/getGrid${query}`, options)
  }

  getAccounts<T>(search?: string): Observable<T> {
    let query: string = !search ? 'codingId=PRSACC05' : `codingId=PRSACC05&search=${search}`;

    return ajax({
      url: `${this.base_url}/api/Coding/codingGetList?${query}`,
      method: 'GET',
      headers: this.getHeadersAjax()
    })
      .pipe(
      map((result: AjaxResponse<{data ?: T[]}>) => result.response.data),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    );
  }

  getTransferees<T>(search?: string): Observable<T> {
    let query: string = !search ? 'codingId=ACC000000004001' : `codingId=ACC000000004001&search=${search}`;

    return ajax({
      url: `${this.base_url}/api/Coding/codingGetList?${query}`,
      method: 'GET',
      headers: this.getHeadersAjax()
    }).pipe(
      map((result: AjaxResponse<{data ?: T[]}>) => result.response.data),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    );
  }

  saveNewData(data: Rayan): Observable<Object> {
    const options = {
      headers: this.getHeaders(),
    }
    return this.httpClient.post(`${this.base_url}/api/FolderData/add`, data, options)
  }

  getHeaders() {
    const token = `Bearer ${localStorage.getItem('token')}`;
    return new HttpHeaders({"Authorization": token});
  }

  getHeadersAjax() {
    const token = `Bearer ${localStorage.getItem('token')}`;
    return {"Authorization": token};
  }
}
