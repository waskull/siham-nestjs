import { Company } from "src/company/entities";
import { User } from "src/user/entities/user.entity";
import { Column, JoinColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable,  } from "typeorm";
import { statusEnum } from "../enum/status.enum";

@Entity('route')
export class Route{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'varchar', length: 100, nullable: true})
    description: string;

    @CreateDateColumn({type:'timestamp'})
    createdAt: Date;

    @ManyToMany(() => Company, (company) => company.routes)
    @JoinTable({
        name: 'routes_companies',
        joinColumn: {
            name: 'routes_id'
        },
        inverseJoinColumn: {
            name: 'category_id'
        },
    })
    companies: Company[]

    @ManyToOne(type => User, (user) => user.routes, { cascade:true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({name: "user_id"})
    salesman: User;

    @Column({type: 'enum', nullable: false, enum:statusEnum, default:statusEnum.INCOMPLETE })
    status: string;

}