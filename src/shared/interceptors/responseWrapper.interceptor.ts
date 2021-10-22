import { map, Observable } from "rxjs";

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";

@Injectable()
export class ResponseWrapperInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((input) => {
        if (typeof input === "boolean") {
          // if boolean
          input = {
            success: input,
          };
        } else if (input !== Object(input) || Array.isArray(input)) {
          // if other primitive or array
          input = {
            result: input,
          };
        }

        input = {
          ...input,
          statusCode: context.switchToHttp().getResponse().statusCode,
        };
        return input;
      }),
    );
  }
}
