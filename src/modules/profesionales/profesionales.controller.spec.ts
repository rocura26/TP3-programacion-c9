import { Test, TestingModule } from '@nestjs/testing';
import { ProfesionalesController } from './profesionales.controller.js';
import { ProfesionalesService } from './profesionales.service.js';

describe('ProfesionalesController', () => {
  let controller: ProfesionalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfesionalesController],
      providers: [ProfesionalesService],
    }).compile();

    controller = module.get<ProfesionalesController>(ProfesionalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
