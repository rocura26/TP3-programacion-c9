import { Module } from '@nestjs/common';
import { ProfesionalesService } from './profesionales.service.js';
import { ProfesionalesController } from './profesionales.controller.js';

@Module({
  controllers: [ProfesionalesController],
  providers: [ProfesionalesService],
})
export class ProfesionalesModule {}
