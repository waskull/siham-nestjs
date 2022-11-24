import { Controller, Get, Param, Patch, Delete, Post, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSaleDto } from './dtos';
import { Sale, SaleItems } from './entities';
import { Auth, User } from '../common/decorators';
import { User as userEntity } from '../user/entities/user.entity';
import { SaleService } from './sale.service';
import { ItemService } from '../item/item.service';
import { AppResource } from 'src/app.roles';
import { Dates } from 'src/common/Dtos/Dates';

@ApiTags('Sale')
@Controller('sale')
export class SaleController {
    constructor(
        private saleService: SaleService,
        private itemService: ItemService,
    ){}
    @Get()
    async getAll(){
        return await this.saleService.getMany();
    }

    @Get('/waiting')
    async getWaitingSales(){
        return await this.saleService.getWaitingSales();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        return await this.saleService.getOne(id);
    }
    @Get('/client/:id')
    async getAllByClient(@Param('id', ParseIntPipe) id: number){
        return await this.saleService.getWaiting(id);
    }
    @Auth(
        {
            possession: 'own',
            action: 'create',
            resource: AppResource.SALE
        }
    )
    @Post()
    async create(@Body() dto: CreateSaleDto, @User() user: userEntity){
        let sale = new Sale();
        sale.salesman = user;
        sale.client = dto.client;
        if(!sale.salesman) throw new NotFoundException('Vendedor Invalido');
        const items = await this.itemService.getByIds(dto.items.map(a => a.id));
        if(items.length === 0 || items.length < dto.items.length) throw new NotFoundException('Uno o varios de los articulos enviados no existen en la base de datos');
        var saleItems: SaleItems[] = [];
        dto.items.forEach((e, i) => {
            saleItems[i] = {
                quantity: e.quantity,
                sale_id: sale.id,
                item: items[i],
                id: 0
            }
        });
        return await this.saleService.create(sale, saleItems);
    }
    @Post('/date')
    async getByDates(@Body() dates:Dates){
        return await this.saleService.getManyByDate(dates);
    }
    @Auth(
        {
            possession: 'own',
            action: 'delete',
            resource: AppResource.SALE
        }
    )
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        await this.saleService.delete(id);
        return {message:"Venta eliminada"}
    }
}
