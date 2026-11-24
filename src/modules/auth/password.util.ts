import { BadRequestException } from '@nestjs/common';
import bcrypt from 'bcrypt';

// Configuración de bcrypt (igual que en el repo de la profe)
const BCRYPT_ROUNDS = 12;
const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;
const BCRYPT_MAX_PASSWORD_BYTES = 72;

// Transforma la contraseña en un hash. Se usa al registrar o al cambiar la contraseña.
export async function hashPassword(password: string): Promise<string> {
  if (Buffer.byteLength(password, 'utf8') > BCRYPT_MAX_PASSWORD_BYTES) {
    throw new BadRequestException(
      'La contraseña no puede superar los 72 bytes.',
    );
  }

  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

// Compara la contraseña que escribió el usuario con el hash guardado. Se usa al iniciar sesión.
export async function verifyPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  if (
    Buffer.byteLength(password, 'utf8') > BCRYPT_MAX_PASSWORD_BYTES ||
    !BCRYPT_HASH_PATTERN.test(passwordHash)
  ) {
    return false;
  }

  return bcrypt.compare(password, passwordHash);
}
