import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";

import { mixin, Type } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Metadata } from "../shared/tools/types.tool";

export function CrudService<T>(
  entity: Metadata<T>,
): Type<TypeOrmCrudService<T>> {
  class MixinService extends TypeOrmCrudService<T> {
    public constructor(@InjectRepository(entity) repository: Repository<T>) {
      super(repository);
    }
  }

  return mixin(MixinService);
}
