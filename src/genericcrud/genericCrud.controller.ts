import { CrudController } from "@nestjsx/crud";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Inject, Type } from "@nestjs/common";

export function GenericCrudController<T>(): Type<CrudController<T>> {
  class GenericCrudControllerHost implements CrudController<T> {
    public constructor(
      @Inject("GENERIC_CRUD_SERVICE")
      public service: TypeOrmCrudService<T>,
    ) {}
  }

  return GenericCrudControllerHost;
}
