import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o'
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/iproducts';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,CardComponent,FormsModule, SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {


  private readonly CategoriesService= inject(CategoriesService)
  private readonly productsService= inject(ProductsService)

  categoriesList:ICategories[]=[]
  productsList:IProducts[]=[]
  text:string =""

getAllCategoriesData():void{
  this.CategoriesService.getAllCategories().subscribe({
    next:(res)=>{this.categoriesList = res.data;
    },
    error:(err)=>{console.log(err)}
  })
}
getAllProductsData():void{
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
this.productsList=res.data;
    },

    error:(err)=>{
      console.log(err)
    }
  })
}

ngOnInit(): void {
  this.getAllCategoriesData()
  this.getAllProductsData()
}

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:false,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
   items:1,
    nav: true
  }


  categoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:false,
    autoplayHoverPause:true,
    autoplayTimeout:2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }


}
