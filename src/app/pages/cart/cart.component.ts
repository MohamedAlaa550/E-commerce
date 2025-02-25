import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlateformService } from '../../core/services/palteform/plateform.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartDetails: Icart = {} as Icart;
  numOfItems: number = 0;

  private cartService = inject(CartService);
  private toastrService = inject(ToastrService);
  plateformService = inject(PlateformService);
  subGetProducts: Subscription = new Subscription();
  subUdate: Subscription = new Subscription();
  subRemove: Subscription = new Subscription();
  subClear: Subscription = new Subscription();
  pLATFORM_ID = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getProducts();
    }
  }

  ngOnDestroy(): void {
    this.subGetProducts.unsubscribe();
    this.subUdate.unsubscribe();
    this.subRemove.unsubscribe();
    this.subClear.unsubscribe();
  }

  getProducts(): void {
    this.subGetProducts = this.cartService.getCartData().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this.numOfItems = res.numOfCartItems;
        console.log(this.cartDetails, res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateQuantity(id: string, count: number): void {
    this.subUdate = this.cartService
      .updateProductQuantity(id, count)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.cartDetails = res.data;
          this.numOfItems = res.numOfCartItems;
          this.toastrService.success(res.status);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  removeItem(id: string): void {
    this.subRemove = this.cartService.removeSpecificItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
        this.numOfItems = res.numOfCartItems;
        this.toastrService.success('Product Removed');
        this.cartService.numberOfCart.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearCart(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'All products will be removed from your cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subClear = this.cartService.clearCartItems().subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this.getProducts();
              this.toastrService.success('Cart has been cleared successfully');
              this.cartService.numberOfCart.set(0);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
