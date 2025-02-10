import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }


  userData:any = null

  router = inject(Router)


sendRegisterForm(data:object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
}

sendLoginForm(data:object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
}

saveUserData():void{
  this.userData = jwtDecode(JSON.stringify(localStorage.getItem("userToken")))
}

logout(){
  localStorage.removeItem("userToken")
  this.userData = null
  this.router.navigate(["/login"])
}


verifyEmail(data:object):Observable<any>{
return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
}

verifyCode(data:object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }

  resetPassword(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
    }


}
