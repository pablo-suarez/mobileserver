import { CreateBrandInput } from './create-brand.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {
  @Field(() => Int, { description: 'Brands for the products' })
  @IsNotEmpty()
  id: number;
}
