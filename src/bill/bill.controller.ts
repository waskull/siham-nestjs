import { Controller,Res, Get, Param, Patch, Delete, Post, Body, NotFoundException, BadRequestException, ForbiddenException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from 'src/common/decorators';
import { SaleService } from '../sale/sale.service';
import { User as userEntity } from 'src/user/entities/user.entity';
import { BillService } from './bill.service';
import { createBill, EditBillDto } from './dtos';
import { Bill } from './entities';
import { InventoryService } from 'src/inventory/inventory.service';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { statusEnum } from './enum/status-enum';
import { AppResource } from 'src/app.roles';
import { ClientService } from 'src/client/client.service';
import { Dates } from 'src/common/Dtos/Dates';

@ApiTags('Bills')
@Controller('bill')
export class BillController {
    constructor(
        private billService: BillService,
        private saleService: SaleService,
        private inventoryService: InventoryService,
        private clientService: ClientService
    ){}
    @Get()
    async getAll(){
        return await this.billService.getMany();
    }
    @Get('/lastfour')
    async getLastFout(){
        return await this.billService.getMany();
    }
    @Get('/stats')
    async getStats(){
        
        let bills = await this.billService.getCount();
        let clients = await this.clientService.getCount();
        let sales = await this.saleService.getCount();
        let inventory = await this.inventoryService.getCount();
        let topsales = await this.saleService.getTopSales();
        return {bills,clients,sales,inventory,topsales}
    }
    @Get(':id')
    async getOne(@Param('id') id: number){
        return await this.billService.getOne(id);
    }
    @Auth(
        {
            possession: 'own',
            action: 'create',
            resource: AppResource.BILL
        }
    )
    @Post()
    async create(
        @Body() dto: createBill,
        @User() user:userEntity,
        @Res({passthrough: true}) res
        ){
        const sale = await this.saleService.getOne(dto.sale_id);
        if(!sale) throw new NotFoundException("La venta no existe");
        if(sale.status !== statusEnum.WAITING) {return res.status(HttpStatus.BAD_REQUEST).json({message:`La venta seleccionada ya ha sido facturada`});}
        var total = 0;
        const bill = new Bill();
        let error = false;
        let inventory = new Inventory();
        bill.createdBy = user;
        bill.pay_code = dto.pay_code;
        bill.sale = sale.id;
        bill.total_paid = dto.total_paid;
        sale.sale_items.forEach(async element => {
            total += (element.quantity*element.item.price);
            inventory = await  this.inventoryService.getOneByItem(element.item.id);
            if(inventory.stock < element.quantity) { return res.status(HttpStatus.BAD_REQUEST).json({message:`No hay suficiente stock para el item: ${inventory.item.name}`})}
            inventory.stock -= element.quantity;
            this.inventoryService.reduceInventory(inventory);
        });
        bill.total = total;
        const newBill = this.billService.create(bill);

        if(bill.total_paid >= total){const updateSale = await this.saleService.completeSale(dto.sale_id)}
        else{const updateSale = await this.saleService.setSaleIncomplete(dto.sale_id)}
        return {message:"Factura creada"} 
    }
    @Post('/date')
    async getByDates(@Body() dates:Dates){
        return await this.billService.getManyByDate(dates);
    }
    @Auth(
        {
            possession: 'own',
            action: 'update',
            resource: AppResource.BILL
        }
    )
    @Patch(':id')
    async edit(
        @Param('id') id: number, 
        @Body() dto: EditBillDto, 
        ){
        const bill = this.billService.edit(id,dto);
        return {message:"Factura editada"}
    }


    @Auth(
        {
            possession: 'own',
            action: 'delete',
            resource: AppResource.BILL
        }
    )
    @Delete(':id')
    async delete(@Param('id') id: number){
        await this.billService.delete(id);
        return {message:"Factura eliminada"}
    }
}
