import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorage } from "./token-storage.service";

@Injectable({
  providedIn: "root",
})
export class Factory {
  public baseUrl = "http://localhost:8000/api";
  private _headers = {
    Authorization: `Bearer ${this._tokenStorage.getAccessToken()}`,
  };

  constructor(public http: HttpClient, public _tokenStorage: TokenStorage) {}

  public get(endPoint: string, options?: object): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${this._tokenStorage.getAccessToken()}`,
      },
      ...options,
    });
  }

  public post(endPoint: string, data: {}, options?: object): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${endPoint}`, data, {
      headers: {
        Authorization: `Bearer ${this._tokenStorage.getAccessToken()}`,
      },
      ...options,
    });
  }

  public put(endPoint: string, elements: {}, options?: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${endPoint}`, elements, {
      headers: this._headers,
      ...options,
    });
  }

  public patch(endPoint: string, elements: {}, options?: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${endPoint}`, elements, {
      headers: this._headers,
      ...options,
    });
  }

  public delete(endPoint: string, options?: object): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${endPoint}`, {
      headers: this._headers,
      ...options,
    });
  }
}
