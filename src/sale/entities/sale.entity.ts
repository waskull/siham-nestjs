import { User } from "../../user/entities/user.entity";
import { Column, JoinColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable, UpdateDateColumn, OneToOne,  } from "typeorm";
import { Client } from "../../client/entities/client.entity";
import { SaleItems } from "./sale_item.entity";
import { Bill } from "src/bill/entities";
import { statusEnum } from "src/bill/enum/status-enum";

@Entity('sale')
export class Sale{
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(type => Client, (client) => client.sales, { cascade:true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({name: "client_id"})
    client!: number;

    @CreateDateColumn({type:'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updateAt?: Date;

    @ManyToOne(type => User, (user) => user.sales, { cascade:true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({name: "user_id"})
    salesman: User;

    @OneToMany(type => SaleItems, (sale_items) => sale_items.sale_id, { cascade:true, onUpdate: 'CASCADE', onDelete: 'SET NULL'})
    @JoinColumn({name: "sale_items"})
    sale_items: SaleItems[];

    @OneToOne(type => Bill, { onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    bill?: number;

    @Column({type: 'enum', nullable: false, enum:statusEnum, default:statusEnum.WAITING })
    status: string;

}
