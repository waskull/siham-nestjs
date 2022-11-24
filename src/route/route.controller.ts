import { Controller, Get, Param, Patch, Delete, Post, Body, NotFoundException, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RouteService } from './route.service';
import { createRouteDto, EditItemDto, EditRouteSalesmanDto } from './dtos';
import { UserService } from 'src/user/user.service';
import { CompanyService } from 'src/company/company.service';
import { Route } from './entities';
import { statusEnum } from './enum/status.enum';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators';

@ApiTags('Routes')
@Controller('route')
export class RouteController {
    constructor(
        private routeService: RouteService,
        private userService: UserService,
        private companyService: CompanyService
    ){}
    @Get()
    async getAll(){
        return await this.routeService.getMany();
    }
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        return await this.routeService.getOne(id);
    }
    @Auth(
        {
            possession: 'own',
            action: 'create',
            resource: AppResource.ROUTE
        }
    )
    @Post()
    async create(@Body() dto: createRouteDto){
        await this.routeService.create(await this.checkRoutes(dto));
        return {message:"Cronograma creado"}
    }
    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.ROUTE
        }
    )
    @Patch(':id')
    async edit(@Param('id', ParseIntPipe) id: number, @Body() dto: EditItemDto){
        const routes = await this.checkRoutes(dto, true);
        await this.routeService.edit(id,routes);
        return {message:"Cronograma editado"}
    }
    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.ROUTE
        }
    )
    @Put(':id')
    async editStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: EditRouteSalesmanDto){
        const routes = await this.routeService.getOne(id);
        if(!routes) throw new NotFoundException("El cronograma enviado no existe");
        routes.status = dto.status;
        await this.routeService.edit(id,routes);
        return {message:"Cronograma Editado"}
    }
    @Auth(
        {
            possession: 'own',
            action: 'delete',
            resource: AppResource.ROUTE
        }
    )
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        await this.routeService.delete(id);
        return {message:"Cronograma eliminado"}
    }
    async checkRoutes(dto: createRouteDto, editing?: boolean): Promise<Route>{
        const routes = new Route();
        routes.salesman = await this.userService.getOneById(dto.salesman);
        routes.description = dto.description;
        if(!routes.salesman) throw new NotFoundException('Vendedor Invalido');
        routes.companies = await this.companyService.getByIds(dto.companies);
        if(routes.companies.length === 0) throw new NotFoundException('La o las compañias enviadas no existen');
        routes.status = statusEnum.INCOMPLETE;
        if(editing) routes.status = statusEnum.COMPLETED;
        return routes;
    }
}
