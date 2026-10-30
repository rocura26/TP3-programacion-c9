import { Injectable } from '@nestjs/common';
import { CreateProfesionalDto } from './dto/create-profesional.dto.js';
import { UpdateProfesionalDto } from './dto/update-profesional.dto.js';

@Injectable()
export class ProfesionalesService {
  create(createProfesionalDto: CreateProfesionalDto) {
    return 'This action adds a new profesional';
  }

  findAll() {
    return `This action returns all profesionales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profesional`;
  }

  update(id: number, updateProfesionalDto: UpdateProfesionalDto) {
    return `This action updates a #${id} profesional`;
  }

  remove(id: number) {
    return `This action removes a #${id} profesional`;
  }
}
