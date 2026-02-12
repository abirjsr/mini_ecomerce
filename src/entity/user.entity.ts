import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,OneToMany} from 'typeorm';
import {Exclude} from 'class-transformer';
import {Order} from './order.entity';
import{Cart} from './cart.entity';
import {Role} from '../enum/role.enum';
@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true})
    email: string;

    @Column()
    @Exclude()
    password: string;


    @Column()
    firstName: string;

    @Column()
    lastName: string;




    @Column({type:'enum',enum:Role,default:Role.CUSTOMER})
    role: Role;

    @Column({default:0})
    cancelledOrdersCount: number;


    @Column({default:false})
    isSuspended: boolean;

     @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
     

  @OneToMany(() => Cart, cart => cart.user)
cart: Cart[];
    
}