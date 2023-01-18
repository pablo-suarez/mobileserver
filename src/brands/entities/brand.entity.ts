import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name : 'brands'})
@ObjectType()
export class Brand {
  @PrimaryGeneratedColumn('identity')
  @Field(() => ID, { description: 'Brands for the products' })
  id: string;

  @Column()
  @Field( () => String )
  title: string;

  @Column()
  @Field(() => String,{nullable:true})
  description?: string;
}
