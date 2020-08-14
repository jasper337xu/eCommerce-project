import { EntityDataService } from '@ngrx/data';
import { ProductDataService } from '../services/product-data.service';
import { ProductCategoryDataService } from '../services/product-category-data.service';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  providers: [
    ProductDataService,
    ProductCategoryDataService,
  ]
})
export class EntityStoreModule {

  // register data services of each entity that extend from DefaultDataService
  constructor(
    entityDataService: EntityDataService,
    productDataService: ProductDataService,
    productCategoryDataService: ProductCategoryDataService,
  ) {
    entityDataService.registerService('Product', productDataService);
    entityDataService.registerService('ProductCategory', productCategoryDataService);
  }
}
