import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

// class-validator ejecuta los decoradores de ABAJO hacia ARRIBA y, con
// stopAtFirstError, muestra solo el primer error. Por eso el "obligatorio"
// va último: así es lo primero que se revisa.
export class CreateZonaDto {
  @MaxLength(100, { message: 'El nombre de la zona no puede superar los 100 caracteres' })
  @IsString({ message: 'El nombre de la zona debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre de la zona es obligatorio' })
  nombre: string;
}
