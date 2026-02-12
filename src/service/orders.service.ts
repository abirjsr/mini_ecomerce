import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from '../entity/order.entity';
import { OrderItem } from '../entity/order-item.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { CartService } from '../service/cart.service';
import { ProductsService } from '../service/products.service';
import { UsersService } from '../service/users.service';
import { OrderStatus } from '../enum/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    private cartService: CartService,
    private productsService: ProductsService,
    private usersService: UsersService,
    private dataSource: DataSource,
  ) {}

  async createOrder(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const cartItems = await this.cartService.getCart(userId);

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Use transaction to ensure data consistency
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Calculate total and verify stock
      let totalAmount = 0;
      const itemsToSave: OrderItem[] = [];

      for (const cartItem of cartItems) {
        const product = await this.productsService.findOne(cartItem.productId);

        if (product.stock < cartItem.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product: ${product.name}`,
          );
        }

        // Decrease stock
        await this.productsService.decreaseStock(product.id, cartItem.quantity);

        const subtotal = product.price * cartItem.quantity;
        totalAmount += subtotal;

        const orderItem = this.orderItemsRepository.create({
          productId: product.id,
          quantity: cartItem.quantity,
          price: product.price,
          subtotal,
        });

        itemsToSave.push(orderItem);
      }

      // Create order
      const order = queryRunner.manager.create(Order, {
        userId,
        totalAmount,
        shippingAddress: createOrderDto.shippingAddress,
        status: OrderStatus.PENDING,
      });

      const savedOrder = await queryRunner.manager.save(order);

      // Save order items
      for (const item of itemsToSave) {
        item.order = savedOrder as any;
        await queryRunner.manager.save(OrderItem, item);
      }

      // Clear cart
      await this.cartService.clearCart(userId);

      await queryRunner.commitTransaction();

      return this.findOne(savedOrder.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(userId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { userId },
      relations: ['orderItems', 'orderItems.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderItems', 'orderItems.product'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(orderId);

    // Prevent status changes after delivery
    if (order.status === OrderStatus.DELIVERED) {
      throw new BadRequestException('Cannot modify delivered order');
    }

    // Handle cancellation - restore stock
    if (status === OrderStatus.CANCELLED && order.status !== OrderStatus.CANCELLED) {
      await this.handleOrderCancellation(order);
    }

    order.status = status;
    return this.ordersRepository.save(order);
  }

  private async handleOrderCancellation(order: Order): Promise<void> {
    // Restore stock
    for (const item of order.orderItems) {
      await this.productsService.increaseStock(item.productId, item.quantity);
    }

    // Increment user's cancelled order count for fraud detection
    await this.usersService.incrementCancelledOrders(order.userId);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['orderItems', 'orderItems.product', 'user'],
      order: { createdAt: 'DESC' },
    });
  }
}
