import { PartialType } from '@nestjs/mapped-types';
import { CreateZonaDto } from './create-zona.dto.js';

export class UpdateZonaDto extends PartialType(CreateZonaDto) {}
