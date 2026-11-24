import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  isPrismaForeignKeyError,
  isPrismaUniqueConstraintError,
} from '../prisma/prisma-error.util.js';
import { hashPassword } from '../auth/password.util.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

// Campos que devuelve la API: todos menos la contraseña
const userSelect = {
  id: true,
  nombre: true,
  email: true,
  rol: true,
  categoriaId: true,
  zonaId: true,
  precioHora: true,
  descripcion: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateEmail(createUserDto.email);

    // Se separa la contraseña del resto de los datos: no se guarda tal cual
    const { password, ...datos } = createUserDto;

    try {
      return await this.prisma.user.create({
        data: {
          ...datos,
          passwordHash: await hashPassword(password),
        },
        select: userSelect,
      });
    } catch (error) {
      this.manejarError(error);
    }
  }

  findAll() {
    return this.prisma.user.findMany({ select: userSelect });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });

    if (!user) {
      throw new NotFoundException(`No existe un usuario con id ${id}.`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if (updateUserDto.email) {
      await this.validateEmail(updateUserDto.email, id);
    }

    // Si se cambia la contraseña, se guarda su hash
    const { password, ...datos } = updateUserDto;

    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...datos,
          passwordHash: password ? await hashPassword(password) : undefined,
        },
        select: userSelect,
      });
    } catch (error) {
      this.manejarError(error);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.user.delete({
        where: { id },
        select: userSelect,
      });
    } catch (error) {
      if (isPrismaForeignKeyError(error)) {
        throw new ConflictException(
          'No se puede eliminar el usuario porque tiene pedidos asociados.',
        );
      }

      throw error;
    }
  }

  private async validateEmail(email: string, userId?: number) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new ConflictException(
        'Ya existe una cuenta con ese correo electrónico.',
      );
    }
  }

  private manejarError(error: unknown): never {
    if (isPrismaUniqueConstraintError(error)) {
      throw new ConflictException(
        'Ya existe una cuenta con ese correo electrónico.',
      );
    }

    if (isPrismaForeignKeyError(error)) {
      throw new BadRequestException('La categoría o la zona indicada no existe.');
    }

    throw error;
  }
}
