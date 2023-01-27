import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity({ name : 'brands'})
@ObjectType()
export class Brand {
  @PrimaryGeneratedColumn('identity')
  @Field(() => Int, { description: 'Brands for the products' })
  id: number;

  @Column()
  @Field( () => String )
  title: string;

  @Column()
  @Field(() => String,{nullable:true})
  description?: string;

  @OneToMany( () => Product, (product) => product.brand, { lazy: true })
  @Field( () => [Product] )
  products: Product[];
}
