import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createBill, EditBillDto } from './dtos/';
import {Bill} from './entities/';
import { Between } from "typeorm";
import { Dates } from 'src/common/Dtos/Dates';

@Injectable()
export class BillService {
    constructor(
        @InjectRepository(Bill)
        private readonly billRepository: Repository<Bill>
        
        ){}
    async getMany(): Promise<Bill[]>{
        return await this.billRepository.find({relations:['sale' ,'sale.salesman','sale.sale_items','sale.sale_items.item', 'sale.client','createdBy', 'sale.sale_items']});
    }
    async getManyByDate(dates:Dates): Promise<Bill[]>{
        return await this.billRepository.find({relations:['sale' ,'sale.salesman','sale.sale_items','sale.sale_items.item', 'sale.client','createdBy', 'sale.sale_items'], where:{createdAt: Between(
                dates.start,
                dates.end
            ),}});
    }
    async getLastFour(): Promise<Bill[]>{
        return await this.billRepository.find({relations:['sale' ,'sale.salesman','sale.sale_items','sale.sale_items.item', 'sale.client','createdBy', 'sale.sale_items'],take:5,order:{createdAt:"DESC"}});
    }
    async getOne(id: number): Promise<Bill>{
        const bill = await this.billRepository.findOne({where:{id:id},relations:['sale' ,'sale.salesman', 'sale.client','sale.sale_items','sale.sale_items.item','createdBy']})
        if(!bill) throw new NotFoundException('El Cliente no existe');
        return bill;
    }
    async getCount(){
        return await this.billRepository.count();
    }
    async edit(id: number, dto: EditBillDto){
        const bill = await this.getOne(id);
        const editedClient = Object.assign(bill, dto);
        return await this.billRepository.save(editedClient);
    }
    async create(billData: Bill){
        const bill = this.billRepository.create(billData);
        return await this.billRepository.save(bill);
    }
    async delete(id: number){
        const bill = await this.getOne(id)
        return await this.billRepository.delete(id)
    }
}
