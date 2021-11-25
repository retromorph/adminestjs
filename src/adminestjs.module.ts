import { Module } from "@nestjs/common";

import { AuthenticationModule } from "./authentication/authentication.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule, AuthenticationModule],
})
export class AdminestjsModule {}
