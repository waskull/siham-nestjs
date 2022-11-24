import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { statusEnum } from 'src/bill/enum/status-enum';
import { Dates } from 'src/common/Dtos/Dates';
import { In, Repository, Between } from 'typeorm';
import {Sale, SaleItems} from './entities/'

@Injectable()
export class SaleService {
    constructor(
        @InjectRepository(Sale)
        private readonly saleRepository: Repository<Sale>,
        @InjectRepository(SaleItems)
        private readonly saleItemRepository: Repository<SaleItems>
        ){}
    async getMany(): Promise<Sale[]>{
        return await this.saleRepository.find({relations:['sale_items', 'sale_items.item', 'salesman', 'client']});
    }
    async getManyByDate(dates:Dates): Promise<Sale[]>{
        return await this.saleRepository.find({relations:['sale_items', 'sale_items.item', 'salesman', 'client'], where:{createdAt: Between(
                dates.start,
                dates.end
            ),}});
    }
    async getTopSales(): Promise<Sale[]>{
        return await this.saleItemRepository.query('select name, sum(quantity) as sales from sale_items inner join item on sale_items.item_id = item.id  group by name order by sum(quantity) desc limit 5;');
    }
    async getCount(): Promise<number>{
        return await this.saleRepository.count();
    }
    async getOne(id: number): Promise<Sale>{
        const sales = await this.saleRepository.findOne({relations:['sale_items', 'sale_items.item', 'salesman', 'client'], where:{id:id}})
        if(!sales) throw new NotFoundException('La venta no existe');
        return sales;
    }
    async getIncompletes(client_id: number): Promise<Sale[]>{
        const sales = await this.saleRepository.find({relations:['sale_items', 'sale_items.item', 'salesman', 'client'], where:{client:client_id,status:statusEnum.INCOMPLETE}})
        if(!sales) throw new NotFoundException('La venta no existe');
        return sales;
    }
    async getWaitingSales(): Promise<Sale[]>{
        const sales = await this.saleRepository.find({relations:['sale_items', 'sale_items.item', 'salesman', 'client'], where:{status:statusEnum.WAITING}})
        if(!sales) throw new NotFoundException('La venta no existe');
        return sales;
    }
    async getWaiting(client_id: number): Promise<Sale[]>{
        const sales = await this.saleRepository.find({relations:['sale_items', 'sale_items.item', 'salesman', 'client'], where:{client:client_id,status:statusEnum.WAITING}})
        if(!sales) throw new NotFoundException('La venta no existe');
        return sales;
    }

    async edit(id: number, sale: Sale){
        const sales = await this.getOne(id);
        const editedClient = Object.assign(sales, sale);
        return await this.saleRepository.save(editedClient);
    }

    async completeSale(id:number){
        const sale = await this.getOne(id);
        sale.status = statusEnum.COMPLETED;
        return await this.saleRepository.save(sale);
    }

    async setSaleIncomplete(id:number){
        const sale = await this.getOne(id);
        sale.status = statusEnum.INCOMPLETE;
        return await this.saleRepository.save(sale);
    }

    async create(sale: Sale, newItems: SaleItems[]): Promise<Sale>{
        const newSale = this.saleRepository.create({
            salesman:{id:sale.salesman.id},
            client: sale.client
        });
        const savedOrder = await this.saleRepository.save(newSale);


        newItems.forEach(async e => {
            e.sale_id = savedOrder.id;
        });
        const newitems = await this.saleItemRepository.create(newItems);
        const saveItems = await this.saleItemRepository.save(newitems);


        return savedOrder;
    }
    async delete(id: number){
        const sale = await this.getOne(id)
        return await this.saleRepository.delete(id)
    }
    
}

