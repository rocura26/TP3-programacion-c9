import {
  IsDateString,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

// class-validator ejecuta los decoradores de ABAJO hacia ARRIBA y, con
// stopAtFirstError, muestra solo el primer error. Por eso el "obligatorio"
// va último: así es lo primero que se revisa.
export class CreatePedidoDto {
  @Min(1, { message: 'El cliente debe ser un id válido (1 o mayor)' })
  @IsInt({ message: 'El cliente debe ser un número entero' })
  @IsDefined({ message: 'El cliente es obligatorio' })
  clienteId: number;

  @Min(1, { message: 'El profesional debe ser un id válido (1 o mayor)' })
  @IsInt({ message: 'El profesional debe ser un número entero' })
  @IsDefined({ message: 'El profesional es obligatorio' })
  profesionalId: number;

  @Min(1, { message: 'El estado debe ser un id válido (1 o mayor)' })
  @IsInt({ message: 'El estado debe ser un número entero' })
  @IsDefined({ message: 'El estado es obligatorio' })
  estadoId: number;

  @MaxLength(255, {
    message: 'La dirección no puede superar los 255 caracteres',
  })
  @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
  @IsString({ message: 'La dirección debe ser un texto' })
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  direccion: string;

  @IsDateString(
    {},
    { message: 'La fecha debe tener un formato válido (por ejemplo, 2026-11-06)' },
  )
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  fecha: string;

  @MaxLength(500, {
    message: 'La descripción no puede superar los 500 caracteres',
  })
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;
}
