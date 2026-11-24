import { Module } from '@nestjs/common';
import { ZonasService } from './zonas.service.js';
import { ZonasController } from './zonas.controller.js';

@Module({
  controllers: [ZonasController],
  providers: [ZonasService],
})
export class ZonasModule {}
