import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { UserService } from "src/user/user.service";
import { JWT_KEY } from "src/config/constants";
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private userService: UserService, 
        private config: ConfigService
        ){
            // super({
            //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //     ignoreExpiration: false,
            //     secretOrKey: config.get<string>(JWT_KEY)
            // });
            super({
              jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
              ]),
              ignoreExpiration: false,
              secretOrKey: config.get<string>(JWT_KEY),
            });
        }

        private static extractJWT(req: RequestType): string | null {
          if (
              req.cookies &&
              'auth-cookie' in req.cookies) {
                  return req.cookies["auth-cookie"];
            }
            return null;
          }

        async validate(payload: any){
            const {sub: id} = payload;
            return await this.userService.getOne(id);
        }
}