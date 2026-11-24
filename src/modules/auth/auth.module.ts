import 'dotenv/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';

@Module({
  imports: [
    // JwtModule permite inyectar JwtService en AuthService (firma los tokens)
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          throw new Error('La variable de entorno JWT_SECRET es obligatoria.');
        }

        return { secret, signOptions: { expiresIn: '1h' } };
      },
    }),
    // Para poder inyectar UsersService en AuthService
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
