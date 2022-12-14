import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Item } from 'src/item/entities/item.entity';
import { ItemService } from 'src/item/item.service';
import { Order } from './entities';
import { OrderItems } from './entities/';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports:[
  TypeOrmModule.forFeature([Order, Item, OrderItems, Inventory])
,
],
  controllers: [OrderController],
  providers: [OrderService, ItemService],
  exports: [OrderService]
})
export class OrderModule {}
