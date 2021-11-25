import { IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    type: String,
    description: "User's username",
    required: true,
    nullable: false,
    readOnly: true,
  })
  @IsString()
  public username: string;

  @ApiProperty({
    type: String,
    description:
      "User's password (without password validation cause it's login interfaces)",
    required: true,
    nullable: false,
    readOnly: true,
  })
  @IsString()
  public password: string;
}
