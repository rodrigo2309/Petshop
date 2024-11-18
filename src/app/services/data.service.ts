import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public url = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  authenticate(data: any) {
    return this.http.post(`${this.url}/accounts/authenticate`, data);
  }
}
