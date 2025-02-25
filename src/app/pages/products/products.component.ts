import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/iproducts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [FormsModule,SearchPipe,CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  text:string = ""
  private productsService = inject(ProductsService)
  productsList:IProducts[]=[]
  subProducts:Subscription = new Subscription()

  ngOnInit(): void {

   this.subProducts= this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productsList = res.data

      }
    })

  }


  ngOnDestroy(): void {
  this.subProducts.unsubscribe()

  }



}
