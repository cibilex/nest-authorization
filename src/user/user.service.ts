import { BadRequestException, Injectable } from '@nestjs/common';
import { UserT } from 'src/types/user.type';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  private users: UserT[] = [
    {
      id: 1,
      firstName: 'cibilex',
      lastName: 'tarkan',
      email: 'cibilex@cibilex.com',
      password: '12345678',
    },
    {
      id: 2,
      firstName: 'anderson',
      lastName: 'carl',
      email: 'test@test.com',
      password: '12345678',
    },
  ];

  async login({ password, ...data }: LoginUserDto) {
    const user = this.users.find((user) => user.email === data.email);
    if (!user)
      throw new BadRequestException('User not found with entered email');
    if (user.password !== password)
      throw new BadRequestException(
        'Entered password does not match with the user password',
      );
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
    return token;
  }

  profile(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new BadRequestException('User Not found');
    const { password, ...data } = user;
    console.assert(!!password);
    return data;
  }
}
