import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDTO } from './requests/register.request';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDTO) {
    const result = await this.authService.register(dto);
    return result;
  }
}
