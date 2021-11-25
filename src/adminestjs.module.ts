import { DynamicModule, Module } from "@nestjs/common";

import { JwtSecretConfigInterface } from "./_configs/interfaces/jwtSecretConfig.interface";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UserModule } from "./user/user.module";

@Module({})
export class AdminestjsModule {
  public static forRoot(
    jwtSecretConfig: JwtSecretConfigInterface,
  ): DynamicModule {
    return {
      module: AdminestjsModule,
      imports: [UserModule, AuthenticationModule.forRoot(jwtSecretConfig)],
    };
  }
}
