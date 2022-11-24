import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { User } from '../user/entities/user.entity'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ) {}
    
    async validateUser(email:string,password:string): Promise<any>{
        const user = await this.userService.findByEmail({email});
        if(user && await compare(password, user.password)){
            const {password, ...rest} = user;
            return rest;
        }
        return null;
    }

    async login(user: User){
        const { id, ...rest } = user;
        const payload = { sub: id };
        return {
            user,
            accessToken: this.jwtService.sign(payload)
        }
    }
}
