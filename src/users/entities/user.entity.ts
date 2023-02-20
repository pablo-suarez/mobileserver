import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Role } from '../../roles/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name : 'users'})
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column() 
  @Field(() => String)
  first_name: string;

  @Column() 
  @Field(() => String)
  last_name: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()

  password: string;

  @Column()
  @Field(() => String)
  dni: string;

  @Column({name:'is_active', default:true})
  @Field(() => Boolean)
  isActive?: boolean;

  @Column({name:'role_id'})
  @Field(() => Int,{nullable:false})
  roleId:number;

  @ManyToOne( () => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  @Field( () => Role )
  role: Role;

}
