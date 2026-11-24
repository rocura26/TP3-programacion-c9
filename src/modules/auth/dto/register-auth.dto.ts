import { CreateUserDto } from '../../users/dto/create-user.dto.js';

// El registro pide los mismos datos que crear un usuario (nombre, email,
// contraseña, rol y, si es profesional, categoría, zona y precio).
// Se reutiliza el DTO de users para no repetir las validaciones.
export class RegisterAuthDto extends CreateUserDto {}
