import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../../shared/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o'

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

 private productsService = inject(ProductsService)
 private activatedRoute = inject(ActivatedRoute)

 productDetails:IProducts | null = null
 subDatailes: Subscription = new Subscription
 imageList:string[]=[]

 ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next:(p)=>{
let productId:string | null = p.get("id")
this.subDatailes= this.productsService.getSpecificProduct(productId).subscribe({
  next:(res)=>{this.productDetails = res.data
this.imageList=res.data.images
console.log(this.imageList, this.productDetails);

  },

  error:(err)=>{console.log(err);
  }
})
    }
  })


 }


 ngOnDestroy(): void {
this.subDatailes.unsubscribe()

 }


 mainSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay:false,
  autoplayTimeout:2000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['<span class="text-mainColor hover:text-green-200 ">next</span>', '<span class="text-mainColor hover:text-green-200"">prev</span>'],
 items:1,
  nav: true
}


}
