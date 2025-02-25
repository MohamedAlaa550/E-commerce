import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { log } from 'console';
import { PlateformService } from '../../core/services/palteform/plateform.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  loading: boolean = false;
  ordersService = inject(OrdersService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  cartId: string = '';
  plateformService = inject(PlateformService);

  paymentForm: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]{1,30}$/),
    ]),
  });

  ngOnInit(): void {
    if (this.plateformService.checkPlateform()) {
      this.activatedRoute.paramMap.subscribe((p) => {
        this.cartId = p.get('cId')!;
        console.log(this.cartId);
      });
    }
  }

  onlinePayment(): void {
    if (this.paymentForm.valid) {
      this.loading = true;
      this.ordersService
        .checkoutSession(this.cartId, this.paymentForm.value)
        .subscribe({
          next: (res) => {
            if (res.status === 'success') {
              console.log(res);

              open(res.session.url, '_self');
            }

            this.loading = false;
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
          },
        });
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  cashPayment(): void {
    if (this.paymentForm.valid) {
      this.loading = true;
      this.ordersService
        .creatCashOrder(this.cartId, this.paymentForm.value)
        .subscribe({
          next: (res) => {
            if (res.status === 'success') {
              this.router.navigate(['/allorders']);
            }

            this.loading = false;
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
          },
        });
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }
}
