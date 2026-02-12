import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { JwtAuthGuard } from '../auth//jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GetUser } from '../auth//get-user.decorator';
import { Role } from '../enum/role.enum';
import { User } from '../entity/user.entity';

@Controller('cart')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.CUSTOMER)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(
    @GetUser() user: User,
    @Body(ValidationPipe) addToCartDto: AddToCartDto,
  ) {
    return this.cartService.addToCart(user.id, addToCartDto);
  }

  @Get()
  getCart(@GetUser() user: User) {
    return this.cartService.getCart(user.id);
  }

  @Delete(':id')
  removeFromCart(@GetUser() user: User, @Param('id') id: string) {
    return this.cartService.removeFromCart(user.id, id);
  }
}
