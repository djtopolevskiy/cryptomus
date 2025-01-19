import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from 'src/common/dto/user';
import { AppErrors } from 'src/common/errors';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  public async registerUser(dto: CreateUserDto) {
    const newUser = await this.userService.createUser(dto);
    const payload = {
      email: dto.email,
      name: dto.name,
    };
    const token = await this.tokenService.generateJwtToken(payload);
    return { ...newUser, token };
  }

  public async loginUser(dto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);

    if (!user) {
      return new BadRequestException(AppErrors.USER_NOT_EXISTS);
    }
    const checkPassword = await bcrypt.compare(dto.password, user.password);
    if (!checkPassword) {
      return new BadRequestException(AppErrors.INVALID_PASSWORD);
    }
    delete user.password;

    const payload = {
      email: dto.email,
    };
    const token = await this.tokenService.generateJwtToken(payload);
    return { ...user, token };
  }
}
