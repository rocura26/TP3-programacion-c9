import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfesionalesService } from './profesionales.service.js';
import { CreateProfesionalDto } from './dto/create-profesional.dto.js';
import { UpdateProfesionalDto } from './dto/update-profesional.dto.js';

@Controller('profesionales')
export class ProfesionalesController {
  constructor(private readonly profesionalesService: ProfesionalesService) {}

  @Post()
  create(@Body() createProfesionalDto: CreateProfesionalDto) {
    return this.profesionalesService.create(createProfesionalDto);
  }

  @Get()
  findAll() {
    return this.profesionalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesionalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfesionalDto: UpdateProfesionalDto) {
    return this.profesionalesService.update(+id, updateProfesionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesionalesService.remove(+id);
  }
}
