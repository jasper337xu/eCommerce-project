import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalQuantity: number;
  totalPrice: number;

  expirationMonthList: number[];
  expirationYearList: number[];

  constructor(private formBuilder: FormBuilder,
              private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        address: [''],
        city: [''],
        province: [''],
        postalCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        address: [''],
        city: [''],
        province: [''],
        postalCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardNumber: [''],
        nameOnCard: [''],
        expirationMonth: [''],
        expirationYear: [''],
        securityCode: ['']
      })
    });

    this.checkoutService.getMonths(1).subscribe(
      data => {
        this.expirationMonthList = data;
      }
    )

    this.checkoutService.getYears().subscribe(
      data => {
        this.expirationYearList = data;
      }
    )
  }

  copyShippingToBilling(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  onSubmit() {
    console.log(`Handle order submission.`);
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingAddress').value);
    console.log(this.checkoutFormGroup.get('billingAddress').value);
    console.log(this.checkoutFormGroup.get('creditCard').value);
  }

  handleDependentMonth() {
    // if expiration year is current year, then populate expiration months starting from current month
    // if expiration year is a future year, then populate all months from 1 to 12
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const expirationYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;
    if (expirationYear === currentYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    // subscribe to checkout service to get the new list of expiration months that are dependent on selected year
    this.checkoutService.getMonths(startMonth).subscribe(
      data => {
        this.expirationMonthList = data;
      }
    );
  }

}
