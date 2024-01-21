import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from 'src/auth/auth.decorator';
import { User } from './user.decorator';
import { UserT } from 'src/types/user.type';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @Auth(false)
  login(@Body() body: LoginUserDto) {
    return this.userService.login(body);
  }

  @Auth(true)
  @Get('profile')
  profile(@User() user: UserT) {
    return this.userService.profile(user.id);
  }
}
