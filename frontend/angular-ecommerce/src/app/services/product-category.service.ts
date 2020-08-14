import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { ProductCategory } from '../model/product-category';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends EntityCollectionServiceBase<ProductCategory> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ProductCategory', serviceElementsFactory);
  }
}