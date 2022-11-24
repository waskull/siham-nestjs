import { User } from "../../user/entities/user.entity";
import { Column, JoinColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinTable, UpdateDateColumn,  } from "typeorm";
import { Sale } from "../../sale/entities/sale.entity";
import { statusEnum } from "../enum/status-enum";



@Entity('bill')
export class Bill{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Sale, { cascade:true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({name: "sale_id"})
    sale!: number;

    @Column({type:'decimal', nullable:false})
    total!: number;

    @Column({type:'decimal', default:0, nullable:false})
    total_paid!: number;

    @ManyToOne(type => User, (user) => user.bills, { cascade:true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({name: "createdBy"})
    createdBy!: User;

    @Column({type: 'simple-array', nullable: true})
    pay_code: string[];

    @CreateDateColumn({type:'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updateAt?: Date;

}