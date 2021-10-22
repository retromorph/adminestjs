import { Module } from "@nestjs/common";

import { TypeormMysqlQueryFailedExceptionFilter } from "./typeormMysqlQueryFailedException.filter";

@Module({
  providers: [TypeormMysqlQueryFailedExceptionFilter],
  exports: [TypeormMysqlQueryFailedExceptionFilter],
})
export class FiltersModule {}
