import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AuthResolver, AuthService],
  exports:[JwtModule],
  imports:[
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports:[ ConfigModule],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => ({ 
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '4h'
        }
      })
    }),
    UsersModule
  ]
})
export class AuthModule {}
