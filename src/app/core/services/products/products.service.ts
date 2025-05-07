import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/products?page=1&limit=56`
    );
  }

  getSpecificProduct(id: string | null): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }

  getMoviesDatat(movieName: string): Observable<any> {
    return this.httpClient.get(
      `https://www.omdbapi.com/?s=${movieName}&apikey=917bdfc2`
    );
  }
}
