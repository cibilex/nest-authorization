import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(40)
  password: string;
}
