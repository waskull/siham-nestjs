import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';
import { In, Repository } from 'typeorm';
import { CreateInventoryDto, EditInventoryDto } from './dtos/';
import {Inventory} from './entities/inventory.entity'

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>
        )
        {}
    async getMany(): Promise<Inventory[]>{
        return await this.inventoryRepository.find({relations:['item']});
    }
    async getCount(): Promise<number>{
        return await this.inventoryRepository.count();
    }
    async getOne(id: number): Promise<Inventory>{
        const inventory = await this.inventoryRepository.findOne({where:{id:id},relations:['item']})
        if(!inventory) throw new NotFoundException('El Inventario no existe');
        return inventory;
    }
    async getOneByItem(id: number): Promise<Inventory>{
        const inventory = await this.inventoryRepository.findOne({where:{item:{id:id}},relations:["item"]})
        if(!inventory) throw new NotFoundException('El Inventario no existe');
        return inventory;
    }
    async edit(id: number, dto: CreateInventoryDto){
        const item = await this.itemRepository.findOne({where:{id:dto.item_id}});
        if(!item) throw new NotFoundException('El item no existe o fue borrado');
        const editedInventory = Object.assign(item, dto);
        return await this.inventoryRepository.save(editedInventory);
    }
    async delete(id: number){
        const inventory = await this.getOne(id)
        return await this.inventoryRepository.delete(id)
    }
    async getByIds(items: number[]): Promise<Inventory[]>{
        return await this.inventoryRepository.findBy({item:In(items)});
    }

    async reduceInventory(inventory: Inventory): Promise<Inventory>{
        return await this.inventoryRepository.save(inventory);
    }

}
