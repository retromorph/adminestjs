import { createConnection, getRepository } from "typeorm";
import { UserEntity } from "./user/user.entity";
import { UserService } from "./user/user.service";
import { CreateUserDto } from "./user/dtos/createUser.dto";

async function createSuperuser(createUserDto: CreateUserDto): Promise<void> {
  await createConnection();
  const userRepository = getRepository(UserEntity);
  const userService = new UserService(userRepository);
  await userService.createSuperuser(createUserDto);
}

const args = process.argv.slice(2);
const username = args[0];
const password = args[1];
const createUserDto = {
  username,
  password,
};

createSuperuser(createUserDto);
