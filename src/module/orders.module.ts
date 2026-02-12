import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from '../service/orders.service';
import { OrdersController } from '../controller/orders.controller';
import { Order } from '../entity/order.entity';
import { OrderItem } from '../entity/order-item.entity';
import { CartModule } from '../module/cart.module'
import { ProductsModule } from '../module/products.module'
import { UsersModule } from '../module/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    CartModule,
    ProductsModule,
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
