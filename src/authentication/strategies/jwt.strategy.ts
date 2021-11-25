import { ExtractJwt, Strategy } from "passport-jwt";

import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { JwtSecretConfigInterface } from "../../_configs/interfaces/jwtSecretConfig.interface";
import jwtSecretConfig from "../../_configs/jwtSecret.config";
import { UserEntity } from "../../user/user.entity";
import { UserService } from "../../user/user.service";
import { TokenPayloadInterface } from "../interfaces/tokenPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @Inject(jwtSecretConfig.KEY) jwtConfig: JwtSecretConfigInterface,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  public async validate(
    payload: TokenPayloadInterface,
  ): Promise<UserEntity | undefined> {
    return await this.userService.findOneById(payload.id);
  }
}
