import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public generateJwtToken(user): Promise<string> {
    const payload = { user };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('secret'),
      expiresIn: this.configService.get<string>('expireJwt'),
    });
  }
}
