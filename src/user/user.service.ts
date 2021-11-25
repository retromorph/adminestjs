import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateUserDto } from "./dtos/createUser.dto";
import { UserEntity, UserRoles } from "./user.entity";

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findOneById(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(id);
  }

  public async findOneByUsername(
    username: string,
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(username);
  }

  private async createUser(
    createUserDto: CreateUserDto,
    role: UserRoles,
  ): Promise<UserEntity> {
    return await this.userRepository.save(
      this.userRepository.create({
        ...createUserDto,
        role,
      }),
    );
  }

  public async createSuperuser(
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    const currentSuperuser = await this.userRepository.findOne({
      where: {
        role: UserRoles.SUPERUSER,
      },
    });

    if (currentSuperuser) {
      await this.userRepository.delete(currentSuperuser);
    }

    return await this.createUser(createUserDto, UserRoles.SUPERUSER);
  }
}
