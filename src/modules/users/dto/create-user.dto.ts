import {
  IsDefined,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

export const ROLES = ['cliente', 'profesional'] as const;
export type Rol = (typeof ROLES)[number];

const esProfesional = (user: CreateUserDto) => user.rol === 'profesional';

export class CreateUserDto {
  // Datos de todos los usuarios
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  @MaxLength(255, { message: 'El email no puede superar los 255 caracteres' })
  email: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(72, {
    message: 'La contraseña no puede superar los 72 caracteres',
  })
  password: string;

  @IsIn(ROLES, { message: 'El rol debe ser cliente o profesional' })
  rol: Rol;

  // Datos que solo completan los profesionales (obligatorios si rol = profesional)
  @ValidateIf(esProfesional)
  @IsDefined({ message: 'La categoría es obligatoria para profesionales' })
  @IsInt({ message: 'La categoría debe ser un número entero' })
  @Min(1, { message: 'La categoría debe ser un id válido (1 o mayor)' })
  categoriaId?: number;

  @ValidateIf(esProfesional)
  @IsDefined({ message: 'La zona es obligatoria para profesionales' })
  @IsInt({ message: 'La zona debe ser un número entero' })
  @Min(1, { message: 'La zona debe ser un id válido (1 o mayor)' })
  zonaId?: number;

  @ValidateIf(esProfesional)
  @IsDefined({ message: 'El precio por hora es obligatorio para profesionales' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio por hora debe ser un número con hasta 2 decimales' },
  )
  @Min(0, { message: 'El precio por hora no puede ser negativo' })
  precioHora?: number;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  @MaxLength(500, {
    message: 'La descripción no puede superar los 500 caracteres',
  })
  descripcion?: string;
}
