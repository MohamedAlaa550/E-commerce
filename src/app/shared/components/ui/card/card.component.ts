import { Component, input } from '@angular/core';
import { IProducts } from '../../../interfaces/iproducts';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  productElement = input<IProducts>()

}
