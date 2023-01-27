import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String,{nullable:true})
  @IsString()
  @IsOptional()
  description?: string;
}
