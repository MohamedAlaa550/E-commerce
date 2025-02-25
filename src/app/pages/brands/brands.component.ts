import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shared/interfaces/ibrand';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  private brandsService = inject(BrandsService);
  brandsList: IBrand[] = [];
  subBrand: Subscription = new Subscription();

  ngOnInit(): void {
    this.subBrand = this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
        console.log(this.brandsList);
      },
    });
  }

  ngOnDestroy(): void {
    this.subBrand.unsubscribe();
  }
}
