import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupInput } from './dto/inputs';
import { AuthResponse } from './types/auth-responses.types';

@Injectable()
export class AuthService {


    constructor(
        private readonly usersService:UsersService,
        private readonly jwtService: JwtService
    ){}

    private getJwtToken( userId: string ) {
        return this.jwtService.sign({ id: userId });
    }

    async signup( signupInput: SignupInput ): Promise<AuthResponse> { 

        const user = await this.usersService.create( signupInput )

        const token = this.getJwtToken( user.id );

        return {token, user}
               
    }
}
