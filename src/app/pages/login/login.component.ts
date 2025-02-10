import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup,ReactiveFormsModule , Validators,} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
authService = inject(AuthService)

  msgEmailExist:string=""

  loading:boolean=false

  router = inject(Router)

  msgSuccess:string  =""




loginForm:FormGroup = new FormGroup({

  email:new FormControl(null,[Validators.required, Validators.email]),
  password:new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z]\w{5,}$/)]),

})

submitForm ():void{
if(this.loginForm.valid){
  this.loading =true
  this.authService.sendLoginForm(this.loginForm.value).subscribe({
    next:(res)=>{
      localStorage.setItem("userToken", res.token)
      this.authService.saveUserData()
this.msgSuccess = res.message
this.msgEmailExist=""


setTimeout(()=>{
  this.router.navigate(["/home"])
},500)

this.loading =  false
    },
    error:(err)=>{
      this.msgEmailExist = err.error.message
      this.loading =  false
    }
  })

}

else{
  this.loginForm.markAllAsTouched();
}

}

confirmPassword(group:AbstractControl){

 const password= group.get("password")?.value;
 const rePassword= group.get("rePassword")?.value;

 return password === rePassword ? null : {mismatch:true}


}

}


