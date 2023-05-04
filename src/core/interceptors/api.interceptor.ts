import { ErrorCode } from './../enmus/error-code.enum';
import { ResponseResult } from './../entities/response-result';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, StreamableFile } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { uuid } from 'short-uuid';

/**
 * 处理API通用的前置后置内容
 */
@Injectable()
export class APIInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    // 设置TraceId
    const traceIdHeaderKey = 'traceid';
    let traceIdHeaderValue = request.headers[traceIdHeaderKey];
    // 如果没有ID，则生成一个GUUID
    if (!traceIdHeaderValue) {
      traceIdHeaderValue = uuid();
      request.headers[traceIdHeaderKey] = traceIdHeaderValue;
    }
    return next.handle().pipe(
      map((data) => {
        if (data instanceof StreamableFile) {
          return data;
        }
        if (data instanceof ResponseResult) {
          return data;
        } else {
          return new ResponseResult(request, {
            code: ErrorCode.SUCCESS,
            message: 'success',
            data: data,
          });
        }
      }),
    );
  }
}
