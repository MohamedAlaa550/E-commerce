import { Component, computed, inject, input, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { PlateformService } from '../../core/services/palteform/plateform.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly cartService = inject(CartService);
  isLogin = input<boolean>(true);
  authService = inject(AuthService);
  isNavbarOpen: boolean = false;
  numOfCartItems: Signal<number> = computed(() =>
    this.cartService.numberOfCart()
  );

  isDarkMode = false;
  plateformService = inject(PlateformService);

  ngOnInit() {
    if (this.plateformService.checkPlateform()) {
      this.isDarkMode = localStorage.getItem('darkMode') === 'true';
      this.applyDarkMode();

      if (localStorage.getItem('userToken')) {
        this.cartService.getCartData().subscribe({
          next: (res) => {
            this.cartService.numberOfCart.set(res.numOfCartItems);
          },
        });
      }
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyDarkMode();
  }

  private applyDarkMode() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}
