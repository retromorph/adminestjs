import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GenericCrudModule } from "../genericcrud/genericCrud.module";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    GenericCrudModule.forRoot(UserEntity),
  ],
  providers: [UserService],
})
export class UserModule {}
