import { Module } from '@nestjs/common';
import { TypesItemsService } from './types_items.service';
import { TypesItemsResolver } from './types_items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesItem } from './entities/types_item.entity';

@Module({
  providers: [TypesItemsResolver, TypesItemsService],
  imports : [
    TypeOrmModule.forFeature([TypesItem])
  ],
  exports:[TypesItemsService]
})
export class TypesItemsModule {}
