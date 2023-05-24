/*
 * @Author: qiujie qiujieee_empty@outlook.com
 * @Date: 2023-05-22 21:36:22
 * @LastEditors: qiujie qiujieee_empty@outlook.com
 * @LastEditTime: 2023-05-23 21:00:46
 * @FilePath: /yuque_hook/src/core/interceptors/api.interceptor.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ErrorCode } from './../enmus/error-code.enum';
import { ResponseResult } from './../entities/response-result';
import { HttpStatus, Injectable, NestInterceptor, ExecutionContext, CallHandler, StreamableFile } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { uuid } from 'short-uuid';

/**
 * 处理API通用的前置后置内容
 */
@Injectable()
export class APIInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();

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
        if (request.method === 'POST') {
          if (response.statusCode === HttpStatus.CREATED) {
            response.status(HttpStatus.OK);
          }
        }

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
