import { CreateBrandInput } from './create-brand.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {
  @Field(() => ID, { description: 'Brands for the products' })
  @IsNotEmpty()
  @IsString()
  id: string;
}
