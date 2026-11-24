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

// class-validator ejecuta los decoradores de ABAJO hacia ARRIBA y, con
// stopAtFirstError, muestra solo el primer error. Por eso el "obligatorio"
// va último: así es lo primero que se revisa.
export class CreateUserDto {
  // Datos de todos los usuarios
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @MaxLength(255, { message: 'El email no puede superar los 255 caracteres' })
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @MaxLength(72, {
    message: 'La contraseña no puede superar los 72 caracteres',
  })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;

  @IsIn(ROLES, { message: 'El rol debe ser cliente o profesional' })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  rol: Rol;

  // Datos que solo completan los profesionales (obligatorios si rol = profesional)
  @ValidateIf(esProfesional)
  @Min(1, { message: 'La categoría debe ser un id válido (1 o mayor)' })
  @IsInt({ message: 'La categoría debe ser un número entero' })
  @IsDefined({ message: 'La categoría es obligatoria para profesionales' })
  categoriaId?: number;

  @ValidateIf(esProfesional)
  @Min(1, { message: 'La zona debe ser un id válido (1 o mayor)' })
  @IsInt({ message: 'La zona debe ser un número entero' })
  @IsDefined({ message: 'La zona es obligatoria para profesionales' })
  zonaId?: number;

  @ValidateIf(esProfesional)
  @Min(0, { message: 'El precio por hora no puede ser negativo' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio por hora debe ser un número con hasta 2 decimales' },
  )
  @IsDefined({ message: 'El precio por hora es obligatorio para profesionales' })
  precioHora?: number;

  @IsOptional()
  @MaxLength(500, {
    message: 'La descripción no puede superar los 500 caracteres',
  })
  @IsString({ message: 'La descripción debe ser un texto' })
  descripcion?: string;
}
