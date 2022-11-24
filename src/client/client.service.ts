import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dtos/';
import {Client} from './entities/client.entity'

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly itemRepository: Repository<Client>){}
    async getMany(): Promise<Client[]>{
        return await this.itemRepository.find({relations:['companies']});
    }
    async getCount(): Promise<number>{
        return await this.itemRepository.count();
    }
    async getOne(id: number): Promise<Client>{
        const client = await this.itemRepository.findOne({where:{id:id}})
        if(!client) throw new NotFoundException('El Cliente no existe');
        return client;
    }
    async findOneByEmail(email: string): Promise<Client>{
        const client = await this.itemRepository.findOne({where:{email:email}})
        if(client) throw new BadRequestException('Ya existe el correo de ese cliente');
        return client;
    }
    async edit(id: number, dto: CreateClientDto){
        const client = await this.getOne(id);
        const editedClient = Object.assign(client, dto);
        return await this.itemRepository.save(editedClient);
    }
    async create(dto: CreateClientDto){
        const client = this.itemRepository.create(dto);
        return await this.itemRepository.save(client);
    }
    async delete(id: number){
        const client = await this.getOne(id)
        return await this.itemRepository.delete(id)
    }
}
