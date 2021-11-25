import { Crud, CrudController } from "@nestjsx/crud";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Controller, Inject, Type, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../authentication/guards/jwtAuth.guard";
import { CrudOptions } from "@nestjsx/crud/lib/interfaces";

export function GenericCrudController<T>(
  entity: Type<T>,
  additionalCrudOptions: Partial<CrudOptions>,
): Type<CrudController<T>> {
  const name = entity.name[0].toLowerCase() + entity.name.slice(1);
  const baseCrudOptions: CrudOptions = {
    model: {
      type: entity,
    },
    routes: {
      getManyBase: {
        decorators: [UseGuards(JwtAuthGuard)],
      },
      getOneBase: {
        decorators: [UseGuards(JwtAuthGuard)],
      },
      createOneBase: {
        decorators: [UseGuards(JwtAuthGuard)],
      },
      createManyBase: {
        decorators: [UseGuards(JwtAuthGuard)],
      },
      updateOneBase: {
        decorators: [UseGuards(JwtAuthGuard)],
      },
      replaceOneBase: {
        decorators: [UseGuards(JwtAuthGuard)],
      },
      deleteOneBase: {
        decorators: [UseGuards(JwtAuthGuard)],
      },
    },
  };

  @ApiTags(name)
  @Crud({
    ...baseCrudOptions,
    ...additionalCrudOptions,
  })
  @Controller(name)
  class GenericCrudControllerHost implements CrudController<T> {
    public constructor(
      @Inject("GENERIC_CRUD_SERVICE")
      public service: TypeOrmCrudService<T>,
    ) {}
  }

  return GenericCrudControllerHost;
}
