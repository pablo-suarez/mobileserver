import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsResolver } from './brands.resolver';
import { Brand } from './entities/brand.entity';

@Module({
  providers: [BrandsResolver, BrandsService],
  imports : [
    TypeOrmModule.forFeature([Brand])
  ]
})
export class BrandsModule {}
