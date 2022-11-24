import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entities/client.entity';
import { InventoryService } from 'src/inventory/inventory.service';
import { Item } from 'src/item/entities/item.entity';
import { ItemService } from 'src/item/item.service';
import { Inventory } from '../inventory/entities/inventory.entity';
import { Sale, SaleItems } from '../sale/entities';
import { SaleService } from '../sale/sale.service';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { Bill } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Bill, Inventory, Sale, SaleItems, Item, Client])
  ],
  controllers: [BillController],
  providers: [BillService, SaleService, InventoryService, ItemService, ClientService]
})
export class BillModule {}
