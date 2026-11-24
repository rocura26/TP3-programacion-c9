import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// class-validator ejecuta los decoradores de ABAJO hacia ARRIBA y, con
// stopAtFirstError, muestra solo el primer error. Por eso el "obligatorio"
// va último: así es lo primero que se revisa.
export class CreateCategoriaDto {
  @MaxLength(100, { message: 'El nombre de la categoría no puede superar los 100 caracteres' })
  @IsString({ message: 'El nombre de la categoría debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio' })
  nombre: string;

  @IsOptional()
  @MaxLength(255, {
    message: 'La descripción de la categoría no puede superar los 255 caracteres',
  })
  @IsString({ message: 'La descripción de la categoría debe ser un texto' })
  descripcion?: string;
}
