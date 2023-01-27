import { CreateTypesItemInput } from './create-types_item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateTypesItemInput extends PartialType(CreateTypesItemInput) {
  @Field(() => Int, { description: 'Type of Item for the products' })
  @IsNotEmpty()
  id: number;
}
