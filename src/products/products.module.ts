import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { BrandsModule } from 'src/brands/brands.module';
import { TypesItemsModule } from 'src/types_items/types_items.module';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports : [
    TypeOrmModule.forFeature([Product]),
    BrandsModule,
    TypesItemsModule,
    CategoriesModule
  ]
})
export class ProductsModule {}
