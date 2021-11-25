import * as bcrypt from "bcrypt";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { LoginUserDto } from "../user/dtos/loginUser.dto";
import { UserService } from "../user/user.service";
import { TokenInterface } from "./interfaces/token.interface";
import { TokenPayloadInterface } from "./interfaces/tokenPayload.interface";

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginUser: LoginUserDto): Promise<TokenInterface> {
    const user = await this.userService.findOneByUsername(loginUser.username);

    if (user && (await bcrypt.compare(loginUser.password, user.password))) {
      const payload: TokenPayloadInterface = {
        id: user.id,
      };

      return {
        accessToken: this.jwtService.sign(payload),
        payload: payload,
        expiresAt: 3 * 24 * 60 * 60,
      };
    }

    throw new UnauthorizedException();
  }
}
