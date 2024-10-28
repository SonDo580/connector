import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterRequestBody {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
