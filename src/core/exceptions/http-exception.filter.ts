import { ApiException } from './api-exception';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { ResponseAction, ResponseResult } from '../entities';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    let status = exception.getStatus();
    // 如果为自定义的错误类型，则使用自定义的错误处理逻辑
    if (exception instanceof ApiException) {
      const code = exception.getErrorCode();
      const message = exception.getErrorMessage();
      const result = new ResponseResult(request, {
        code,
        action: ResponseAction.Toast,
        message,
        data: exception.getData(),
      });
      response.status(HttpStatus.OK).send(result);
    } else {
      const res = exception.getResponse() as any;
      // 系统默认的错误
      let message = exception.message;
      if (res && res?.message.length) {
        if (typeof res.message === 'string') {
          message = res.message;
          status = HttpStatus.OK;
        } else if (Array.isArray(res.message)) {
          status = HttpStatus.OK;
          message = res.message.join(',');
        }
        message = res?.message;
      }
      const result = new ResponseResult(request, {
        code: status,
        action: ResponseAction.Toast,
        message: message,
      });
      response.status(status).send(result);
    }
  }
}
