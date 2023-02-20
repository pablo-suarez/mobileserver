import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { SignupInput } from 'src/auth/dto/inputs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  private logger = new Logger('UsersService')

  constructor(
    @InjectRepository(User)
    private readonly usersRepository:Repository<User>,
    private readonly roleRepository:RolesService
  ){}

  async create(signupInput: SignupInput):Promise<User> {
    try {

      const newUser = this.usersRepository.create({ 
        ...signupInput,
        password: bcrypt.hashSync( signupInput.password, 10 )
       });

      return await this.usersRepository.save( newUser ); 

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll():Promise<User[]> {
    return [];
  }

  findOne(id: string):Promise<User> {
    throw new Error(`FIND ONE NOT IMPLEMENTED`);
  }

  update(id: string, updateUserInput: UpdateUserInput):Promise<User> {
    throw new Error(`UPDATE NOT IMPLEMENTED`);
  }

  disable(id: string):Promise<User> {
    throw new Error(`DISABLE NOT IMPLEMENTED`);
  }

  async getRole(id:number){
    return await this.roleRepository.findOne(id);
  }

  private handleDBErrors( error: any ): never{
    
    if( error.code === '23505' ){
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    if( error.code == 'error-001' ){
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error( error );
    
    throw new InternalServerErrorException('Please check server logs');
  }

}
