import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports:[
    TypeOrmModule.forFeature([User]),
    RolesModule
  ],
  exports:[
    UsersService
  ]
})
export class UsersModule {}
