import { Body, Controller, Post } from "@nestjs/common";

import { LoginUserDto } from "../user/dtos/loginUser.dto";
import { AuthenticationService } from "./authentication.service";
import { TokenInterface } from "./interfaces/token.interface";

@Controller("authentication")
export class AuthenticationController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post("login")
  public async login(@Body() loginUser: LoginUserDto): Promise<TokenInterface> {
    return this.authenticationService.login(loginUser);
  }
}
