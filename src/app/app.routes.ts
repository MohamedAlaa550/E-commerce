import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGaurd } from './core/guards/auth.guard';
import { DetailsComponent } from './pages/details/details.component';
import { ForgetPasswordComponent } from './shared/components/buseniss/forget-password/forget-password.component';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { WishlistComponent } from './pages/wishList/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      {
        path: 'forgetpassword',
        component: ForgetPasswordComponent,
        title: 'Forget Password',
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
        canActivate: [authGaurd],
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart',
        canActivate: [authGaurd],
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products',
        canActivate: [authGaurd],
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories',
        canActivate: [authGaurd],
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'Brands',
        canActivate: [authGaurd],
      },
      {
        path: 'allorders',
        component: AllordersComponent,
        title: 'Orders',
        canActivate: [authGaurd],
      },
      {
        path: 'checkout/:cId',
        component: CheckoutComponent,
        title: 'Checkout',
        canActivate: [authGaurd],
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details',
        canActivate: [authGaurd],
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/wishList/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
        title: 'WishList',
        canActivate: [authGaurd],
      },
      { path: '**', component: NotfoundComponent, title: 'Page Not Found' },
    ],
  },
];
