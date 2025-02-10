import { Component, inject, input } from '@angular/core';
import { IProducts } from '../../../interfaces/iproducts';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  productElement = input<IProducts>()



}
