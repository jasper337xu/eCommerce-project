import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, 
                                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
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
    this.checkoutFormGroup.get('customer').get('firstName').errors.required
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

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
    if (this.checkoutFormGroup.invalid) {
      // trigger the display of form error message
      this.checkoutFormGroup.markAllAsTouched();
    }
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
