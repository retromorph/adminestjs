import { Crud, CrudController } from "@nestjsx/crud";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Controller, Inject, Type } from "@nestjs/common";

export function GenericCrudController<T>(
  entity: Type<T>,
): Type<CrudController<T>> {
  @Crud({
    model: {
      type: entity,
    },
  })
  @Controller(entity.name)
  class GenericCrudControllerHost implements CrudController<T> {
    public constructor(
      @Inject("GENERIC_CRUD_SERVICE")
      public service: TypeOrmCrudService<T>,
    ) {}
  }

  return GenericCrudControllerHost;
}
