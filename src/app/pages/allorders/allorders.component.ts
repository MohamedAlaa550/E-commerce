import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, switchMap } from 'rxjs';
import { ProductsService } from '../../core/services/products/products.service';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent {
  constructor(private productsService: ProductsService) {}
  moviesList: any[] = [];

  @ViewChild('searchInput') searchInput!: ElementRef;

  ngAfterViewInit(): void {
    console.log(this.searchInput.nativeElement);

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        distinctUntilChanged(),
        debounceTime(2000),
        switchMap((res: any) => {
          return this.productsService.getMoviesDatat(res.target.value);
        })
      )

      .subscribe({
        next: (res) => {
          console.log(res.Search);
          this.moviesList = res.Search;
        },
      });
  }
}
