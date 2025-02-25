import { Component, inject, input, OnChanges } from '@angular/core';
import { IProducts } from '../../../interfaces/iproducts';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { PlateformService } from '../../../../core/services/palteform/plateform.service';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  productElement = input<IProducts>();

  private cartService = inject(CartService);
  private toastrService = inject(ToastrService);
  private wishlistService = inject(WishlistService);
  private plateformService = inject(PlateformService);

  chekHeart: boolean = false;
  wishlistStored: string[] = JSON.parse(
    localStorage.getItem('wishlist') || '[]'
  );

  ngOnInit() {
    if (this.plateformService.checkPlateform()) {
      if (localStorage.getItem('wishlist')) {
        this.wishlistStored = JSON.parse(localStorage.getItem('wishlist')!);
        this.chekHeart = this.wishlistStored.includes(
          this.productElement()?._id!
        );
      }
    }
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success('Fresh Cart', res.message);
        this.cartService.numberOfCart.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToWishlist(id: string): void {
    this.chekHeart = !this.chekHeart;

    if (this.chekHeart) {
      this.wishlistService.addProductWishlist(id).subscribe({
        next: (res) => {
          console.log(res);
          this.toastrService.success(res.message);
          this.wishlistStored.push(id);
          localStorage.setItem('wishlist', JSON.stringify(this.wishlistStored));
        },
        error: (err) => {
          this.chekHeart = !this.chekHeart;
        },
      });
    } else {
      this.wishlistService.removeProductWishlist(id).subscribe({
        next: (res) => {
          this.toastrService.success(
            'Product Removed Successfully From Your Wishlist'
          );
          this.wishlistStored = this.wishlistStored.filter(
            (item: string) => item !== id
          );
          localStorage.setItem('wishlist', JSON.stringify(this.wishlistStored));
        },
        error: (err) => {
          this.chekHeart = !this.chekHeart;
        },
      });
    }
  }
}
