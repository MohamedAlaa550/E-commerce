import { Component, inject } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { IProducts } from '../../../shared/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { PlateformService } from '../../../core/services/palteform/plateform.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  private wishlistService = inject(WishlistService);
  productList: IProducts[] = [];
  subProduct: Subscription = new Subscription();
  private toastrService = inject(ToastrService);
  private cartService = inject(CartService);
  plateformService = inject(PlateformService);

  ngOnInit(): void {
    if (this.plateformService.checkPlateform()) {
      this.getProducts();
    }
  }

  ngOnDestroy(): void {
    this.subProduct.unsubscribe();
  }

  getProducts(): void {
    this.subProduct = this.wishlistService.getProductWishlist().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
    });
  }

  removeItem(id: string): void {
    this.wishlistService.removeProductWishlist(id).subscribe({
      next: (res) => {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        this.getProducts();
        this.toastrService.success(res.message);
        wishlist = wishlist.filter((item: string) => item !== id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      },
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastrService.success('Fresh Cart', res.message);
        this.cartService.numberOfCart.set(res.numOfCartItems);
      },
    });
  }
}
