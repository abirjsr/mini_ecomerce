import {Entity, Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne,Unique,JoinColumn} from 'typeorm';
import {User} from './user.entity';
import {Product} from './product.entity';

@Entity('cart')
@Unique(['user', 'product'])

export class Cart{
    @PrimaryGeneratedColumn('uuid')
    id:String;


    @ManyToOne(() => User, user => user.cart, {onDelete: 'CASCADE'})
    @JoinColumn({name:'userId'})
    user:User;


    @Column()
    userId: string;

    @ManyToOne(() => Product, product => product.cart, {onDelete: 'CASCADE'})
    @JoinColumn({name:'productId'})
    product:Product;

    @Column()
    productId: string;

    @Column({default:1})
    quantity: number;

     @CreateDateColumn()
     createdAt:Date;

     @UpdateDateColumn()
     updatedAt:Date;

}