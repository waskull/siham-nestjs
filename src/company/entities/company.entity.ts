import { Client } from "src/client/entities/client.entity";
import { Route } from "src/route/entities";
import { Column, JoinColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany } from "typeorm";

@Entity('company')
export class Company{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    name: string;
    
    @Column({type: 'varchar', length: 100, nullable: false})
    address: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    phone: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    phone2?: string;

    @ManyToOne(type => Client, (client) => client.companies, { cascade:true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({name: "client_id"})
    client: Client;

    @CreateDateColumn({type:'timestamp'})
    createdAt: Date;

    @ManyToMany(() => Route, (route) => route.companies)
    routes: Route[];
}