import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaUniqueConstraintError } from '../prisma/prisma-error.util.js';
import { CreateZonaDto } from './dto/create-zona.dto.js';
import { UpdateZonaDto } from './dto/update-zona.dto.js';

@Injectable()
export class ZonasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createZonaDto: CreateZonaDto) {
    try {
      return await this.prisma.zona.create({ data: createZonaDto });
    } catch (error) {
      this.manejarError(error);
    }
  }

  findAll() {
    return this.prisma.zona.findMany();
  }

  async findOne(id: number) {
    const zona = await this.prisma.zona.findUnique({ where: { id } });

    if (!zona) {
      throw new NotFoundException(`No existe una zona con id ${id}.`);
    }

    return zona;
  }

  async update(id: number, updateZonaDto: UpdateZonaDto) {
    await this.findOne(id);

    try {
      return await this.prisma.zona.update({
        where: { id },
        data: updateZonaDto,
      });
    } catch (error) {
      this.manejarError(error);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.zona.delete({ where: { id } });
  }

  private manejarError(error: unknown): never {
    if (isPrismaUniqueConstraintError(error)) {
      throw new ConflictException('Ya existe una zona con ese nombre.');
    }

    throw error;
  }
}
