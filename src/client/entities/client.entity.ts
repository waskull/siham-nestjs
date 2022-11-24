import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Company } from "src/company/entities";
import { Sale } from "../../sale/entities";

@Entity('client')
export class Client{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50, nullable: true})
    email?: string;
    
    @Column({type: 'varchar', length: 100, nullable: false})
    firstname: string;

    @Column({type: 'varchar', length: 100, nullable: false})
    lastname: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    cedula: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    phone?: string;

    @OneToMany((type) => Company, (company) => company.client)
    companies: Company[];

    @OneToMany((type) => Sale, (sale) => sale.client)
    sales: Sale[];

    @CreateDateColumn({type:'timestamp'})
    createdAt: Date;
}