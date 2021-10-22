import * as bcrypt from "bcrypt";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum UserRoles {
  SUPERUSER,
  COMMON_USER,
}

@Entity("AdminestjsUser")
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({
    unique: true,
    length: 100,
  })
  public username: string;
  @Column({ length: 40 })
  public password: string;
  @Column({
    type: "enum",
    enum: UserRoles,
  })
  public role: UserRoles;

  @BeforeInsert()
  public async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
  }

  @BeforeUpdate()
  public async hashPasswordBeforeUpdate(): Promise<void> {
    // check password is not bcrypted
    if (this.password.length <= 40) {
      this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
    }
  }
}
