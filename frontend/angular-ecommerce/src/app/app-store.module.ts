import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { EntityDataModule } from "@ngrx/data";
import { entityConfig } from "./entity/entity-metadata";
import { EntityStoreModule } from './entity/entity-store.module';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    EntityStoreModule,
  ]
})
export class AppStoreModule {}