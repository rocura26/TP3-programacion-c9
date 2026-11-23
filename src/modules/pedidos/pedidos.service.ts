import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaForeignKeyError } from '../prisma/prisma-error.util.js';
import { CreatePedidoDto } from './dto/create-pedido.dto.js';
import { UpdatePedidoDto } from './dto/update-pedido.dto.js';

@Injectable()
export class PedidosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto) {
    try {
      return await this.prisma.pedido.create({
        data: {
          ...createPedidoDto,
          // El DTO recibe la fecha como texto ("2026-11-06"); la base guarda una fecha
          fecha: new Date(createPedidoDto.fecha),
        },
      });
    } catch (error) {
      this.manejarError(error);
    }
  }

  findAll() {
    return this.prisma.pedido.findMany();
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedido.findUnique({ where: { id } });

    if (!pedido) {
      throw new NotFoundException(`No existe un pedido con id ${id}.`);
    }

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    await this.findOne(id);

    try {
      return await this.prisma.pedido.update({
        where: { id },
        data: {
          ...updatePedidoDto,
          fecha: updatePedidoDto.fecha
            ? new Date(updatePedidoDto.fecha)
            : undefined,
        },
      });
    } catch (error) {
      this.manejarError(error);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.pedido.delete({ where: { id } });
  }

  private manejarError(error: unknown): never {
    if (isPrismaForeignKeyError(error)) {
      throw new BadRequestException(
        'El cliente, el profesional o el estado indicado no existe.',
      );
    }

    throw error;
  }
}
