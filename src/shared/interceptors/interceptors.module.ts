import { Module } from "@nestjs/common";

import { ResponseWrapperInterceptor } from "./responseWrapper.interceptor";

@Module({
  providers: [ResponseWrapperInterceptor],
  exports: [ResponseWrapperInterceptor],
})
export class InterceptorsModule {}
