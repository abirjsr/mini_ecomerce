// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AuthService } from '../service/auth.service';
// import { AuthController } from '../auth/auth.controller';
// import { UsersModule } from '../module/users.module';
// import { JwtStrategy } from '../auth/jwt.strategy';

// @Module({
//   imports: [
//     UsersModule,
//     PassportModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         secret: configService.get('JWT_SECRET'),
//         signOptions: {
//           expiresIn: configService.get('JWT_EXPIRATION', '7d'),
//         },
//       }),
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy],
//   exports: [AuthService],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../auth/auth.controller';
import { UsersModule } from '../module/users.module';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error(
            'JWT_SECRET is not defined. Please add JWT_SECRET to your .env file',
          );
        }
        return {
          secret: secret,
          signOptions: {
            expiresIn: configService.get<number>('JWT_EXPIRATION_SECONDS', 604800), // 7 days in seconds
            issuer: configService.get<string>('JWT_ISSUER', 'ecommerce-api'),
            audience: configService.get<string>('JWT_AUDIENCE', 'ecommerce-client'),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}

