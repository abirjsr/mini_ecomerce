import{Controller,Get,Post,Body,Patch,Param,Delete,UseGuards,ValidationPipe} from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { Product } from 'src/entity/product.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import{Role} from '../enum/role.enum';
@Controller('products')
export class ProductController{
    constructor(private readonly productsService: ProductsService){}


    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)

    create(@Body(ValidationPipe) createProductDto: CreateProductDto):Promise<Product>{
        return this.productsService.create(createProductDto);
    }


      @Get()
      findAll(): Promise<Product[]> {
        return this.productsService.findAll();
      }
    
        @Get(':id')
        findOne(@Param('id') id: string): Promise<Product> {
          return this.productsService.findOne(id);
        }

        @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}