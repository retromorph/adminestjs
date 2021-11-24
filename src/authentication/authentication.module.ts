import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import jwtSecretConfig from "../_configs/jwtSecret.config";
import { UserModule } from "../user/user.module";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { JwtAuthGuard } from "./guards/jwtAuth.guard";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    ConfigModule.forRoot({
      load: [jwtSecretConfig],
      ignoreEnvFile: process.env["NODE_ENV"] === "production",
    }),
    JwtModule.register({
      ...jwtSecretConfig(),
      signOptions: { expiresIn: "3d" },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthenticationModule {}
