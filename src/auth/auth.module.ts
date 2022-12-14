import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy } from './strategies/';
import { JWT_KEY } from '../config/constants';
import {ConfigService} from '@nestjs/config';

@Module({
  imports:[PassportModule.register({
    defaultStrategy:'jwt'
  }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory:(config: ConfigService) =>({
      secret: config.get<string>(JWT_KEY),
      signOptions: { expiresIn:'12h'}
      })
    }),
    UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {

}
