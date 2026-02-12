// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AuthModule } from './module/auth.module';
// import { UsersModule } from './module/users.module';
// import { ProductsModule } from './module/products.module';
// import { CartModule } from './module/cart.module';
// import { OrdersModule } from './module/orders.module';


// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,   
//     }),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       url: 'postgresql://postgres.vvwuvcezwzjuarxfhivf:Yq+$+-rShaq84CM@aws-1-us-west-1.pooler.supabase.com:5432/postgres',
//       autoLoadEntities: true,
//       synchronize: true,
//     }),
//     AuthModule,
//     UsersModule,
//     ProductsModule,
//     CartModule,
//     OrdersModule
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './module/auth.module';
import { UsersModule } from './module/users.module';
import { ProductsModule } from './module/products.module';
import { CartModule } from './module/cart.module';
import { OrdersModule } from './module/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Explicitly specify the path
      ignoreEnvFile: false,
      validate: (config) => {
        // Optional: Validate required environment variables on startup
        const required = ['JWT_SECRET'];
        const missing = required.filter(key => !config[key]);
        
        if (missing.length > 0) {
          throw new Error(
            `Missing required environment variables: ${missing.join(', ')}`
          );
        }
        
        return config;
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres.vvwuvcezwzjuarxfhivf:Yq+$+-rShaq84CM@aws-1-us-west-1.pooler.supabase.com:5432/postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CartModule,
    OrdersModule,
  ],
})
export class AppModule {}
