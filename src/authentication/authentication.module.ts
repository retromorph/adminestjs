import { DynamicModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { JwtSecretConfigInterface } from "../_configs/interfaces/jwtSecretConfig.interface";
import { UserModule } from "../user/user.module";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { JwtAuthGuard } from "./guards/jwtAuth.guard";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({})
export class AuthenticationModule {
  public static forRoot(
    jwtSecretConfig: JwtSecretConfigInterface,
  ): DynamicModule {
    return {
      module: AuthenticationModule,
      imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
          ...jwtSecretConfig,
          signOptions: { expiresIn: "3d" },
        }),
      ],
      controllers: [AuthenticationController],
      providers: [AuthenticationService, JwtStrategy, JwtAuthGuard],
      exports: [JwtAuthGuard],
    };
  }
}
