import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateUserDto {
  // Datos que solo completan los usuarios que son profesionales
  @IsOptional()
  @IsInt({ message: 'La categoría debe ser un número entero' })
  @Min(1, { message: 'La categoría debe ser un id válido (1 o mayor)' })
  categoriaId?: number;

  @IsOptional()
  @IsInt({ message: 'La zona debe ser un número entero' })
  @Min(1, { message: 'La zona debe ser un id válido (1 o mayor)' })
  zonaId?: number;

  @IsOptional()
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
