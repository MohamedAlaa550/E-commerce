import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }


  checkoutSession(cartID:string, data:object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartID}?url=http://localhost:4200`,
    {
      "shippingAddress":data
    })
  }


  creatCashOrder(cartID:string, data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${cartID}`,
      {
        "shippingAddress":data
      }
   )
    }




}
