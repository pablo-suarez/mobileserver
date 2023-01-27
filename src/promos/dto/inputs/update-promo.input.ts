import { CreatePromoInput } from './create-promo.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdatePromoInput extends PartialType(CreatePromoInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
