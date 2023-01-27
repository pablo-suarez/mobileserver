import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import { Category } from '../../categories/entities/category.entity';
import { TypesItem } from '../../types_items/entities/types_item.entity';

@Entity({ name : 'products'})
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column()
  @Field( () => String )
  name: string;

  @Column()
  @Field(() => String )
  description: string;

  @Column()
  @Field(() => String,{nullable:true} )
  image_path?: string;

  @Column({type: "decimal", precision: 15, scale: 2, default: 0})
  @Field( () => Float )
  price: number;

  @Column()
  @Field(() => Int, { description: 'Available quantity of products' })
  in_stock: number;

  @Column({name:'brand_id'})
  @Field(() => Int,{nullable:false})
  brandId: number;

  @Column({name:'category_id'})
  @Field(() => Int,{nullable:false})
  categoryId:number;

  @Column({name:'type_item_id'})
  @Field(() => Int,{nullable:false})
  typeItemId: number;

  @ManyToOne( () => Brand, (brand) => brand.products, { nullable: false })
  @JoinColumn({ name: 'brand_id' })
  @Field( () => Brand )
  brand: Brand;

  @ManyToOne( () => Category, (category) => category.products, { nullable: false})
  @JoinColumn({ name: 'category_id' })
  @Field( () => Category )
  category: Category;

  @ManyToOne( () => TypesItem, (typeItyem) => typeItyem.products, { nullable: false })
  @JoinColumn({ name: 'type_item_id' })
  @Field( () => TypesItem )
  typeItem: TypesItem;
}
