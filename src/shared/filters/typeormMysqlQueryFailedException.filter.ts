import { Response } from "express";
import { QueryFailedError } from "typeorm";

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";

@Catch(QueryFailedError)
export class TypeormMysqlQueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const output = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: [exception.message.replace(/.*: /, "").replace(/ for .*/, "")],
      error: "Bad Request",
    };

    response.status(HttpStatus.BAD_REQUEST).json(output);
  }
}
