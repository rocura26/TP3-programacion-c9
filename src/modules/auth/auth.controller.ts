import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { RegisterAuthDto } from './dto/register-auth.dto.js';

// Auth no es un CRUD: solo tiene dos POST, uno para registrarse y otro para iniciar sesión.
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
