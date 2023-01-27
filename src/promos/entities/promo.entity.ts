import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name : 'promos'})
@ObjectType()
export class Promo {
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column()
  @Field( () => String )
  title: string;

  @Column()
  @Field(() => String,{nullable:true})
  description?: string;

  @Column({ type: 'timestamp' })
  @Field( () => String )
  date_start: Date;

  @Column({ type: 'timestamp' })
  @Field( () => String )
  date_end: Date;

}
