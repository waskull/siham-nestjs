import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos/';
import {User} from './entities/user.entity'

export interface UserFindOne{
    id?: number;
    email?:string;
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>){}
    async getMany(): Promise<User[]>{
        return await this.userRepository.find();
    }
    async getOne(id: number, userEntity?: User): Promise<User>{
        const user =  await this.userRepository.findOne({where:{id:id}}).then(u => !userEntity ? u : !!userEntity && userEntity.id === u.id ? u : null)
        if(!user) throw new NotFoundException('El usuario no existe o no tienes acceso');
        return user;
    }
    async getOneById(id: number): Promise<User>{
        return  await this.userRepository.findOne({where:{id:id}});
    }
    async findOne(email:string): Promise<User>{
        return await this.userRepository.findOne({where:{email:email}})
    }
    async edit(id: number, editeduser: EditUserDto, userEntity?: User){
        const user = await this.getOne(id);
        const editedUser = Object.assign(user, editeduser);
        return await this.userRepository.save(editedUser);
    }
    async create(dto: CreateUserDto){
        const user = this.userRepository.create(dto);
        return await this.userRepository.save(user);
    }
    async delete(id: number){
        return await this.userRepository.delete(id)
    }
    async findByEmail(data:UserFindOne){
        return await this.userRepository.createQueryBuilder('user').where({email:data.email}).addSelect('user.password').getOne();
    }
}
