import { Injectable,NotFoundException,BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "src/dto/create-product.dto";
import { UpdateProductDto } from "src/dto/update-product.dto";
import { Product } from "src/entity/product.entity";

@Injectable()

    export class ProductsService {

        constructor(
            @InjectRepository(Product)
            private productsRepository: Repository<Product>,
        ) {}


          async  create(CreateProductDto: CreateProductDto): Promise<Product> {
           
            const product = this.productsRepository.create(CreateProductDto);
            return this.productsRepository.save(product);

        
        }


        async findAll():Promise<Product[]> {
            return this.productsRepository.find({where:{isActive:true}});

        }


        async findOne(id:string):Promise<Product>{
            const product= await this.productsRepository.findOne({where:{id:id}});  
            if(!product){
                throw new NotFoundException(`Product with ID ${id} not found`);
            }
            return product;


        }


        async update(id:string, UpdateProductDto:UpdateProductDto):Promise<Product>{
        
           const product = await this.findOne(id);
           if(UpdateProductDto.stock !== undefined && UpdateProductDto.stock < 0){
            throw new BadRequestException('Stock cannot be negative');
           }

              Object.assign(product, UpdateProductDto);

              return this.productsRepository.save(product);

        }

        async remove(id: string): Promise<void> {
       const product = await this.findOne(id);
        await this.productsRepository.remove(product);
        }

         async decreaseStock(productId: string, quantity: number): Promise<void> {
    const product = await this.findOne(productId);

    if (product.stock < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    product.stock -= quantity;
    await this.productsRepository.save(product);
  }

  async increaseStock(productId: string, quantity: number): Promise<void> {
    const product = await this.findOne(productId);
    product.stock += quantity;
    await this.productsRepository.save(product);
  }


    }
