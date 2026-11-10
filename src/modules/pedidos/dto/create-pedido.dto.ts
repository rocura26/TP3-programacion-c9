import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePedidoDto {
  @IsInt({ message: 'El cliente debe ser un número entero' })
  @Min(1, { message: 'El cliente debe ser un id válido (1 o mayor)' })
  clienteId: number;

  @IsInt({ message: 'El profesional debe ser un número entero' })
  @Min(1, { message: 'El profesional debe ser un id válido (1 o mayor)' })
  profesionalId: number;

  @IsInt({ message: 'El estado debe ser un número entero' })
  @Min(1, { message: 'El estado debe ser un id válido (1 o mayor)' })
  estadoId: number;

  @IsString({ message: 'La dirección debe ser un texto' })
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @MaxLength(255, {
    message: 'La dirección no puede superar los 255 caracteres',
  })
  @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
  direccion: string;

  @IsDateString(
    {},
    { message: 'La fecha debe tener un formato válido (por ejemplo, 2026-11-06)' },
  )
  fecha: string;

  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @MaxLength(500, {
    message: 'La descripción no puede superar los 500 caracteres',
  })
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
  descripcion: string;
}
