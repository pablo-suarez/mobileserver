import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PromosService } from './promos.service';
import { PromosResolver } from './promos.resolver';
import { Promo } from './entities/promo.entity';

@Module({
  providers: [PromosResolver, PromosService],
  imports : [
    TypeOrmModule.forFeature([Promo])
  ]
})
export class PromosModule {}
