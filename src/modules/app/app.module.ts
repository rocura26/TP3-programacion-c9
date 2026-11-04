import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from '../users/users.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { PrincipalModule } from '../principal/principal.module.js';
import { ProfesionalesModule } from '../profesionales/profesionales.module.js';
import { PedidosModule } from '../pedidos/pedidos.module.js';
import { CategoriasModule } from '../categorias/categorias.module.js';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrincipalModule,
    ProfesionalesModule,
    PedidosModule,
    CategoriasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
