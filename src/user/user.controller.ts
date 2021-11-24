// import * as E from "fp-ts/Either";
//
import { Controller } from "@nestjs/common";

// import { CreateUserDto } from "./dtos/createUser.dto";
// import { DeleteUserDto } from "./dtos/deleteUser.dto";
// import { UpdateUserDto } from "./dtos/updateUser.dto";
// import { UserEntity } from "./user.entity";
// import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  // public constructor(private readonly userService: UserService) {}
  //
  // @Get("users")
  // public async getUsers(): Promise<UserEntity[]> {
  //   const usersOrError = await this.userService.getUsers()();
  //
  //   if (E.isLeft(usersOrError)) {
  //     throw new BadRequestException();
  //   }
  //   return usersOrError.right;
  // }
  //
  // @Post("create")
  // public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
  //   const userOrError = await this.userService.createCommonUser(createUserDto);
  //   if (E.isLeft(userOrError)) {
  //     throw new BadRequestException();
  //   }
  //   return userOrError.right;
  // }
  //
  // @Patch("update")
  // public async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {
  //   const userOrError = await this.userService.updateUser(updateUserDto);
  //   if (E.isLeft(userOrError)) {
  //     throw new BadRequestException();
  //   }
  //   return userOrError.right;
  // }
  //
  // @Delete("delete")
  // public async deleteUser(deleteUserDto: DeleteUserDto): Promise<boolean> {
  //   const successOrError = await this.userService.deleteUser(deleteUserDto);
  //   if (E.isLeft(successOrError)) {
  //     throw new BadRequestException();
  //   }
  //   return successOrError.right;
  // }
}
