import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ProductCategoryService } from './services/product-category.service';
import { CartService } from './services/cart.service';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchBarComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppStoreModule,
  ],
  providers: [
    ProductService,
    ProductCategoryService,
    CartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
