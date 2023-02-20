import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Column, OneToMany, PrimaryColumn, Entity } from 'typeorm';

@Entity({ name : 'roles'})
@ObjectType()
export class Role {
  @PrimaryColumn()
  @Field(() => Int, { description: 'Role ID' })
  id: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @OneToMany( () => User, (user) => user.role, { lazy: true })
  @Field( () => [User] )
  users: User[];
}
