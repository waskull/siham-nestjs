import { Controller, Get, Param, Patch, Delete, Post, Body, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateItemDto, EditItemDto } from './dtos';
import { ItemService } from './item.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { ACGuard, Role, UseRoles } from 'nest-access-control';
import { AppResource } from 'src/app.roles';

@ApiTags('Items')
@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService){}
    @Get()
    async getAll(){
        const items = await this.itemService.getMany();
        return items;
    }

    
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        return await this.itemService.getOne(id);
    }
    @Post()
    async create(@Body() dto:CreateItemDto){
        await this.itemService.findOneByName(dto.name);
        return await this.itemService.create(dto);
    }

    @Auth(
        {   
            possession: 'own',
            action: 'update',
            resource: AppResource.ITEM
        }
    )
    @Patch(':id')
    async edit(
        @Param('id',
        ParseIntPipe) id:number,
        @Body() dto:EditItemDto){

        return await this.itemService.edit(id, dto);
    }

    @Auth({   
        possession: 'own',
        action: 'delete',
        resource: AppResource.ITEM
    })
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.itemService.delete(id);
    }
}
