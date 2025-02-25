import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient) { }


  getAllCategories():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }

  getSpecificCategory(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`)
  }

  getAllSubCat():Observable<any>{
    return this.httpClient.get("https://ecommerce.routemisr.com/api/v1/subcategories?page=1&limit=60")
  }
}
