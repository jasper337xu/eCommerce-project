import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
        expireMonth: [''],
        expireYear: [''],
        securityCode: ['']
      })
    });
  }

  onSubmit() {
    console.log(`Handle order submission.`);
    console.log(this.checkoutFormGroup.get('customer').value);
  }

}
