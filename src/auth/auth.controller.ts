import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard, JwtAuthGuard } from './guards/';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
    @Body() LoginDto: LoginDto, 
    @User() user:UserEntity,
    @Res({ passthrough: true }) res
    ){
        const data = await this.authService.login(user);
        const {accessToken, ...rest} = data;
        res.cookie("auth-cookie", accessToken, {
            maxAge: 12 * 60 * 60 * 1000,
            httpOnly:true,
            secure:true,
            sameSite: 'strict',
            path: '/',
        });
        return { message:'Login Exitoso', ...rest }
    }
    @Auth()
    @Get('me')
    async whoiam(@User() user:UserEntity){
        return user;
    }

    @Auth()
    @Get('refresh')
    async refreshTOoken(
    @User() user:UserEntity, 
    @Res({ passthrough: true }) res){
        const data = await this.authService.login(user);
        const {accessToken, ...rest} = data;
        res.cookie("auth-cookie", data.accessToken, {
            maxAge: 12 * 60 * 60 * 1000,
            httpOnly:true, secure:true, 
            sameSite: 'Strict'
        });
        return {
            message:'refresh exitoso',
            data: rest
        }
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) res){
        res.cookie('auth-cookie', '', { 
            expires: new Date(), 
            httpOnly:true, secure:true, 
            sameSite: 'Strict' });
        return {message: 'Logout exitoso'}
    }

}
