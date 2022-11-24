import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entities/client.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Item } from 'src/item/entities/item.entity';
import { ItemService } from 'src/item/item.service';
import { Sale, SaleItems } from './entities';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Item, Inventory, Sale, SaleItems, Client])
  ,
  ],
  controllers: [SaleController],
  providers: [SaleService, ClientService, ItemService],
  exports: [SaleService]
})
export class SaleModule {}
