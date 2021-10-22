import * as E from "fp-ts/Either";
import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateUserDto } from "./dtos/createUser.dto";
import { DeleteUserDto } from "./dtos/deleteUser.dto";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { UserEntity, UserRoles } from "./user.entity";

class DuplicateError extends Error {
  public readonly type = "duplicate";
}

async function forcedEither<T>(
  func: () => Promise<T>,
): Promise<E.Either<Error, T>> {
  try {
    const result = await func();
    return E.right(result);
  } catch (error) {
    return E.left(error);
  }
}

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private async createUser(
    createUserDto: CreateUserDto,
    role: UserRoles,
  ): Promise<E.Either<Error, UserEntity>> {
    return forcedEither(
      async () =>
        await this.userRepository.save(
          this.userRepository.create({
            ...createUserDto,
            role,
          }),
        ),
    );
  }

  public async createSuperuser(
    createUserDto: CreateUserDto,
  ): Promise<E.Either<Error, UserEntity>> {
    const currentSuperuser = await this.userRepository.find({
      where: {
        role: UserRoles.SUPERUSER,
      },
    });

    if (!currentSuperuser) {
      return await this.createUser(createUserDto, UserRoles.SUPERUSER);
    }

    return E.left(new DuplicateError());
  }

  public async createCommonUser(
    createUserDto: CreateUserDto,
  ): Promise<E.Either<Error, UserEntity>> {
    return await this.createUser(createUserDto, UserRoles.COMMON_USER);
  }

  public async updateUser(
    updateUserDto: UpdateUserDto,
  ): Promise<E.Either<Error, UserEntity>> {
    return forcedEither(
      async () => await this.userRepository.save(updateUserDto),
    );
  }

  public async deleteUser(
    deleteUserDto: DeleteUserDto,
  ): Promise<E.Either<Error, boolean>> {
    return forcedEither(
      async () => !!(await this.userRepository.delete(deleteUserDto.id)),
    );
  }
}
