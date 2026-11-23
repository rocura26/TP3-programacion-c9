import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaUniqueConstraintError } from '../prisma/prisma-error.util.js';
import { CreateCategoriaDto } from './dto/create-categoria.dto.js';
import { UpdateCategoriaDto } from './dto/update-categoria.dto.js';

@Injectable()
export class CategoriasService {
  // Inyección de dependencia: Nest nos da el PrismaService para consultar la base
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      return await this.prisma.categoria.create({ data: createCategoriaDto });
    } catch (error) {
      this.manejarError(error);
    }
  }

  findAll() {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });

    if (!categoria) {
      throw new NotFoundException(`No existe una categoría con id ${id}.`);
    }

    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    await this.findOne(id);

    try {
      return await this.prisma.categoria.update({
        where: { id },
        data: updateCategoriaDto,
      });
    } catch (error) {
      this.manejarError(error);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.categoria.delete({ where: { id } });
  }

  private manejarError(error: unknown): never {
    if (isPrismaUniqueConstraintError(error)) {
      throw new ConflictException('Ya existe una categoría con ese nombre.');
    }

    throw error;
  }
}
