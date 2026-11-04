import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesionalDto } from './create-profesional.dto.js';

export class UpdateProfesionalDto extends PartialType(CreateProfesionalDto) {}
