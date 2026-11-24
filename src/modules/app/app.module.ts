import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from '../users/users.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { PedidosModule } from '../pedidos/pedidos.module.js';
import { CategoriasModule } from '../categorias/categorias.module.js';
import { ZonasModule } from '../zonas/zonas.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    PedidosModule,
    CategoriasModule,
    ZonasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
