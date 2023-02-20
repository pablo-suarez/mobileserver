import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Matches, MaxLength, MinLength, IsBoolean, IsInt, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {


  @Field(() => String)
  @IsString()
  @MaxLength(30)
  first_name: string;

  @Field(() => String)
  @IsString()
  @MaxLength(30)
  last_name: string;

  @Field(() => String)
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @Field(() => String)
  @IsString()
  dni: string;

  @Field()
  @IsBoolean()
  isActive?: boolean;
/*
  @IsInt()
  @Field()
  roleId?: number;
*/
}
