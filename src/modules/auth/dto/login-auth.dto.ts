import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

// Para iniciar sesión el Front-End solo envía el email y la contraseña.
// (Los decoradores se ejecutan de abajo hacia arriba: el "obligatorio" va último.)
export class LoginAuthDto {
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @MaxLength(72, {
    message: 'La contraseña no puede superar los 72 caracteres',
  })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
