import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";

import { DynamicModule, Module, Type } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GenericCrudController } from "./genericCrud.controller";
import { GenericCrudService } from "./genericCrud.service";

@Module({})
export class GenericCrudModule {
  public static forFeature<T>(entity: Type<T>): DynamicModule {
    const typeOrmFeatureModule = TypeOrmModule.forFeature([entity]);
    const typeOrmFeatureModuleProviders = typeOrmFeatureModule.providers!;
    return {
      module: GenericCrudModule,
      imports: [typeOrmFeatureModule],
      providers: [
        {
          provide: "GENERIC_CRUD_SERVICE",
          useFactory(repository: Repository<T>): TypeOrmCrudService<T> {
            return new (GenericCrudService<T>(entity))(repository);
          },
          inject: [
            (typeOrmFeatureModuleProviders[0] as { provide: string }).provide,
          ],
        },
      ],
      controllers: [GenericCrudController<T>(entity)],
    };
  }
}
