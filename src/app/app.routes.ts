import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGaurd } from './core/guards/auth.guard';

export const routes: Routes = [
  {path:"",redirectTo:"home", pathMatch:"full"},
  {path:"",component:AuthLayoutComponent, children:[
    {path:"login", component:LoginComponent,title:"Login"},
    {path:"register", component:RegisterComponent,title:"Register"}
  ]},
  {path:"", component:MainLayoutComponent,children:[
    {path:"home", component:HomeComponent,title:"Home", canActivate:[authGaurd]},
    {path:"cart", component:CartComponent,title:"Cart", canActivate:[authGaurd]},
    {path:"products", component:ProductsComponent,title:"Products" , canActivate:[authGaurd]},
    {path:"categories", component:CategoriesComponent,title:"Categories" , canActivate:[authGaurd]},
    {path:"brands", component:BrandsComponent,title:"Brands" , canActivate:[authGaurd]},
    {path:"checkout", component:CheckoutComponent,title:"Checkout" , canActivate:[authGaurd]},
    {path:"**", component:NotfoundComponent, title:"Page Not Found" , canActivate:[authGaurd]}
  ]}

];
