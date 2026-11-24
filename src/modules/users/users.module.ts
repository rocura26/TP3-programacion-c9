import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // Se exporta para que AuthService pueda reutilizar la creación de usuarios
  exports: [UsersService],
})
export class UsersModule {}
