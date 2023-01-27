import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String,{nullable:true})
  @IsString()
  @IsOptional()
  description?: string;

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  image_path: string;

  @Field( () => Float )
  @IsPositive()
  price: number;

  @Field( () => Int )
  @IsPositive()
  in_stock: number;

  @IsInt()
  @Field()
  brandId: number;

  @IsInt()
  @Field()
  typeItemId: number;

  @IsInt()
  @Field()
  categoryId: number;
}
