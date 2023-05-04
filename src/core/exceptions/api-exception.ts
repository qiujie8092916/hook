import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enmus';
/**
 * API 异常类
 */
export class ApiException extends HttpException {
  private errorMessage: string;
  private errorCode: ErrorCode;
  private data: any;
  constructor(errorMessage: string, errorCode: ErrorCode, statusCode: HttpStatus, data?: any) {
    super(errorMessage, statusCode);
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
    this.data = data;
  }

  getData(): any {
    return this.data;
  }

  getErrorCode(): number {
    return this.errorCode.valueOf();
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
