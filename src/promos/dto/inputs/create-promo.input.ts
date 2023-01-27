import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePromoInput {
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String,{nullable:true})
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String,{nullable:true})
  @IsNotEmpty()
  date_start: Date;

  @Field(() => String)
  @IsNotEmpty()
  date_end: Date;
}
