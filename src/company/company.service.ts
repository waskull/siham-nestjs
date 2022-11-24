import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { createCompanyDto } from './dtos/';
import {Company} from './entities/'

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        ){}
    async getMany(): Promise<Company[]>{
        return await this.companyRepository.find({relations:['client']});
    }
    async getOne(id: number): Promise<Company>{
        const company = await this.companyRepository.findOne({where:{id:id}})
        if(!company) throw new NotFoundException('La compañia no existe');
        return company;
    }
    async findOneByName(name: string): Promise<Company>{
        const company = await this.companyRepository.findOne({where:{name:name}});
        if(company) {throw new BadRequestException("Ya existe una compañia con ese nombre");}
        return company;
    }
    async getOneByName(name: string): Promise<Company>{
        const item = await this.companyRepository.findOne({where:{name:name}})
        return item;
    }
    async edit(id: number, dto: createCompanyDto){
        const company = await this.getOne(id);
        const editedClient = Object.assign(company, dto);
        return await this.companyRepository.save(editedClient);
    }
    async create(dto: createCompanyDto){
        const company = this.companyRepository.create({...dto, client:{id:dto.client_id}});
        return await this.companyRepository.save(company);

    }
    async delete(id: number){
        const company = await this.getOne(id)
        return await this.companyRepository.delete(id)
    }

    async getByIds(companies: number[]): Promise<Company[]>{
        return await this.companyRepository.findBy({id:In(companies)});
    }
}
