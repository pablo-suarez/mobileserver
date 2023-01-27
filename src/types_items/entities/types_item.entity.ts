import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'types_items'})
@ObjectType()
export class TypesItem {
  @PrimaryGeneratedColumn('identity')
  @Field(() => Int, { description: 'Type of Item for the products' })
  id: number;

  @Column()
  @Field( () => String )
  title: string;

  @Column()
  @Field(() => String,{nullable:true})
  description?: string;

  @OneToMany( () => Product, (product) => product.typeItem, { lazy: true })
  @Field( () => [Product] )
  products: Product[];
}
