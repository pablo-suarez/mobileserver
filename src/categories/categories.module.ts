import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CategoriesResolver, CategoriesService],
  imports : [
    TypeOrmModule.forFeature([Category])
  ],
  exports : [CategoriesService]
})
export class CategoriesModule {}
