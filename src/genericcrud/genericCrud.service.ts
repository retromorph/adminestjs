import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";

import { Type } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

export function GenericCrudService<T>(
  entity: Type<T>,
): Type<TypeOrmCrudService<T>> {
  class GenericCrudServiceHost extends TypeOrmCrudService<T> {
    public constructor(@InjectRepository(entity) repository: Repository<T>) {
      super(repository);
    }
  }

  return GenericCrudServiceHost;
}
