import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { subscribeOn, Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private categoriesService = inject(CategoriesService);
  categoriesList: ICategories[] = [];

  subCate: Subscription = new Subscription();

  ngOnInit(): void {
    this.subCate = this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
    });
  }

  ngOnDestroy(): void {
    this.subCate.unsubscribe();
  }
}
