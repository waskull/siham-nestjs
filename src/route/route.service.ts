import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { createRouteDto } from './dtos/';
import {Route} from './entities/'

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(Route)
        private readonly routeService: Repository<Route>,
        @InjectRepository(Company)
        private readonly companyService: Repository<Company>,
        @InjectRepository(User)
        private readonly userService: Repository<User>
        ){}
    async getMany(): Promise<Route[]>{
        return await this.routeService.find({relations:['salesman', 'companies']});
    }
    async getOne(id: number): Promise<Route>{
        const route = await this.routeService.findOne({relations:['salesman', 'companies'], where:{id:id}})
        if(!route) throw new NotFoundException('El cronograma no existe');
        return route;
    }

    async edit(id: number, routes: Route){
        const route = await this.getOne(id);
        const editedClient = Object.assign(route, routes);
        return await this.routeService.save(editedClient);
    }
    async create(routes: Route): Promise<Route>{
        const schedule = this.routeService.create(routes);
        return await this.routeService.save(schedule);
    }
    async delete(id: number){
        const route = await this.getOne(id)
        return await this.routeService.delete(id)
    }
}
