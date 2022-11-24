import { Controller, Get, Param, Patch, Delete, Post, Body, ParseIntPipe, NotFoundException, BadRequestException, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource, AppRoles } from 'src/app.roles';
import { Auth, User } from 'src/common/decorators';
import { CreateUserDto, EditMyUserDto, EditUserDto, UserRegistration } from './dtos/';
import { User as UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { RolesBuilder, InjectRolesBuilder } from 'nest-access-control'

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
        ){}
    @Get()
    async getAll(){
        return this.userService.getMany();
    }
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        const user = await this.userService.getOne(id);
        if(!user) throw new NotFoundException('El Usuario no existe');
        return {user: user}
    }
    @Auth()
    @Post()
    async create(@Body() dto:CreateUserDto){
        const user = await this.userService.findOne(dto.email);
        if(user) throw new BadRequestException('Ese correo ya ha sido registrado');
        this.userService.create(dto);
        return {message: `Usuario: ${dto.firstname} ${dto.lastname} creado`}
    }
    @Auth()
    @Post('register')
    async registration(@Body() dto: UserRegistration) {
      const data = await this.userService.create({
        ...dto,
        roles: [AppRoles.VENDEDOR],
      });
      return { message: 'User registrado', data };
    }
    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.USER
        }
    )
    @Put()
    async editMyUser(
        @Body() dto:EditMyUserDto,
        @User() userLogged: UserEntity
    ){
        let data = await this.userService.edit(userLogged.id, dto, userLogged)
        return {message: 'Usuario Editado',
            user: {
              id:data.id,
                email:data.email,
                firstname:data.firstname,
                lastname:data.lastname,
                cedula:data.cedula,
                phone:data.phone,
                age:data.age,
                roles:data.roles
            }
        }
    }
    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.USER
        }
    )
    @Patch(':id')
    async edit(
        @Param('id', ParseIntPipe) id: number, 
        @Body() dto:EditUserDto,
        @User() userLogged: UserEntity
    ){
        let data;
        if(this.rolesBuilder.can(userLogged.roles).updateAny(AppResource.USER).granted){
            this.userService.edit(id, dto);
            return {message: `Usuario editado`}
        }else{
            const { roles, ...rest } = dto;
            data = await this.userService.edit(id, rest, userLogged);
            return {"Usuario: editado:": data}
        }
    }
    @Auth({
        possession: 'own',
        action: 'delete',
        resource: AppResource.USER
    })
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        const user = await this.userService.getOne(id);
        if(!user) throw new NotFoundException('El Usuario no existe');
        this.userService.delete(id);
        return {message: `El usuario: ha sido borrado`}
    }
}
