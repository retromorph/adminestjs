// import * as E from "fp-ts/Either";
// import * as TE from "fp-ts/lib/TaskEither";
// import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// import { CreateUserDto } from "./dtos/createUser.dto";
// import { DeleteUserDto } from "./dtos/deleteUser.dto";
// import { UpdateUserDto } from "./dtos/updateUser.dto";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";

// class DuplicateError extends Error {
//   public readonly type = "duplicate";
// }
//
// class NotFoundError extends Error {
//   public readonly type = "not found";
// }

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findOneById(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(id);
  }

  // private async createUser(
  //   createUserDto: CreateUserDto,
  //   role: UserRoles,
  // ): Promise<E.Either<Error, UserEntity>> {
  //   return TE.tryCatch(
  //     () => async () =>
  //       await this.userRepository.save(
  //         this.userRepository.create({
  //           ...createUserDto,
  //           role,
  //         }),
  //       ),
  //   );
  // }
  //
  // public getUsers(): TE.TaskEither<Error, UserEntity[]> {
  //   return TE.tryCatch(
  //     () => this.userRepository.find(),
  //     (reason) => Object.assign(new Error(), reason),
  //   );
  // }
  //
  // public async createSuperuser(
  //   createUserDto: CreateUserDto,
  // ): Promise<E.Either<Error, UserEntity>> {
  //   const currentSuperuser = await this.userRepository.find({
  //     where: {
  //       role: UserRoles.SUPERUSER,
  //     },
  //   });
  //
  //   if (!currentSuperuser) {
  //     return await this.createUser(createUserDto, UserRoles.SUPERUSER);
  //   }
  //   return E.left(new DuplicateError());
  // }
  //
  // public async createCommonUser(
  //   createUserDto: CreateUserDto,
  // ): Promise<E.Either<Error, UserEntity>> {
  //   return await this.createUser(createUserDto, UserRoles.COMMON_USER);
  // }
  //
  // public async updateUser(
  //   updateUserDto: UpdateUserDto,
  // ): Promise<E.Either<Error, UserEntity>> {
  //   const userToUpdate = await this.userRepository.findOne(updateUserDto.id);
  //   if (userToUpdate && userToUpdate.role == UserRoles.COMMON_USER) {
  //     return forcedEither(
  //       async () => await this.userRepository.save(updateUserDto),
  //     );
  //   }
  //
  //   return E.left(new NotFoundError());
  // }
  //
  // public async deleteUser(
  //   deleteUserDto: DeleteUserDto,
  // ): Promise<E.Either<Error, boolean>> {
  //   const userToUpdate = await this.userRepository.findOne(deleteUserDto.id);
  //   if (userToUpdate && userToUpdate.role == UserRoles.COMMON_USER) {
  //     return forcedEither(
  //       async () => !!(await this.userRepository.delete(deleteUserDto.id)),
  //     );
  //   }
  //
  //   return E.left(new NotFoundError());
  // }
}
