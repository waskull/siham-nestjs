import { Item } from "src/item/entities/item.entity";
import { Column, JoinColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable, UpdateDateColumn,  } from "typeorm";
import { Order } from "./order.entity";


@Entity('order_items')
export class OrderItems{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Item, (item) => item.order_item, { cascade:true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({name: "item_id"})
    item!: Item;


    @Column({type: 'integer', nullable:false})
    quantity!: number;

    @ManyToOne(type => Order, (order) => order.order_items)
    @JoinColumn({name: "order_id"})
    order_id: number;
    
}

