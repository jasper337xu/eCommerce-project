import { EntityDataService } from '@ngrx/data';
import { ProductDataService } from '../services/product-data.service';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  providers: [ProductDataService]
})
export class EntityStoreModule {

  // register data services of each entity that extend from DefaultDataService
  constructor(
    entityDataService: EntityDataService,
    productDataService: ProductDataService
  ) {
    entityDataService.registerService('Product', productDataService);
  }
}
