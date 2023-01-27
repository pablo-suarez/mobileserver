import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'categories'})
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('identity')
  @Field(() => Int, { description: 'Categories for the products' })
  id: number;

  @Column()
  @Field( () => String )
  title: string;

  @Column()
  @Field(() => String,{nullable:true})
  description?: string;

  @OneToMany( () => Product, (product) => product.category, { lazy: true })
  @Field( () => [Product] )
  products: Product[];
}
