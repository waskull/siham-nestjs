import { Controller, Get, Param, Patch, Delete, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
import { ClientService } from './client.service';
import { CreateClientDto } from './dtos';

@ApiTags('Clients')
@Controller('client')
export class ClientController {
    constructor(
        private clientService: ClientService,
    ){}
    @Get()
    async getAll(){
        return await this.clientService.getMany();
    }
    @Get(':id')
    async getOne(@Param('id') id: number){
        return await this.clientService.getOne(id);
    }
    @Auth(
        {
            possession: 'own',
            action: 'create',
            resource: AppResource.CLIENT
        }
    )
    @Post()
    async create(@Body() dto: CreateClientDto){
        const client = this.clientService.create(dto);
        return {message:"Cliente creado"}
    }
    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.CLIENT
        }
    )
    @Patch(':id')
    async edit(@Param('id') id: number, @Body() dto: CreateClientDto){
        const client = this.clientService.edit(id,dto);
        return {message:"Cliente editado"}
    }
    @Auth(
        {
            possession: 'own',
            action: 'delete',
            resource: AppResource.CLIENT
        }
    )
    @Delete(':id')
    async delete(@Param('id') id: number){
        await this.clientService.delete(id);
        return {message:"Cliente eliminado"}
    }
}
