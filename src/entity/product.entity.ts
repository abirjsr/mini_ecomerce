import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {Cart} from './cart.entity';
import {Order} from './order.entity';
import { OrderItem } from './order-item.entity';
@Entity('products')
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @Column('text')
    description:string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ default: 0 })
    stock: number;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Cart, cart => cart.product)
    cart: Cart[];


    @OneToMany(() => OrderItem, orderItem => orderItem.product)
orderItems: OrderItem[];
}