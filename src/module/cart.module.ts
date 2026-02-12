import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from '../service/cart.service';
import { CartController } from '../controller/cart.controller';
import { Cart } from '../entity/cart.entity';
import { ProductsModule } from '../module/products.module'

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), ProductsModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
