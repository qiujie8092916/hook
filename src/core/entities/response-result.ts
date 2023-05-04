import { ApiProperty } from '@nestjs/swagger';
import * as os from 'os';
/**
 * 错误处理动作
 */
export enum ResponseAction {
  /**
   * 静默，不做任何动作
   */
  Slient = 0, // 静默
  /**
   * Toast.show
   */
  Toast = 1,
  /**
   * Dialog.show
   */
  Dialog = 2,
  /**
   * message.warn
   */
  MessageWarn = 3,
  /**
   * message.error
   */
  MessageError = 4,
  /**
   * notification
   */
  Notifiy = 5, // notification
  /**
   * 跳转到通用的错误页面
   */
  Page = 9,
  /**
   * 跳转特定页面，地址放在 `url`字段
   */
  JUMP = 10,
}

export class ResponseResult<T> {
  /**
   * responseData
   */
  @ApiProperty({ title: '数据' })
  data: T;
  /**
   * 错误码
   */
  @ApiProperty({ title: '错误码' })
  code?: number;
  /**
   * 错误提示信息
   */
  @ApiProperty({ title: '响应消息（一般异常时使用）' })
  message?: string;
  /**
   * 错误处理动作
   */
  @ApiProperty({ title: '错误处理后续的动作，比如弹窗、Toast、跳转页面' })
  action?: ResponseAction;
  /**
   * 跳转页面地址
   */
  @ApiProperty({ title: '跳转页面地址，需要结合action使用' })
  url?: string;
  /**
   * 响应时间点
   */
  @ApiProperty({ title: '响应数据的时间' })
  timestamp?: string;
  /**
   * API Path
   */
  @ApiProperty({ title: 'API路径' })
  path?: string;

  /**
   * 链路跟踪ID
   */
  @ApiProperty({ title: '链路跟踪唯一ID' })
  traceId?: string;

  /**
   * 方便后端故障排除:主机当前的访问服务器
   */
  @ApiProperty({ title: '当前主机名，方便排查问题' })
  host?: string;

  constructor(request: Request, data?: Partial<ResponseResult<T>>) {
    if (data) {
      Object.assign(this, data);
    }
    // 设置响应时间
    this.timestamp = new Date().toISOString();
    // 设置响应Path
    this.path = request.url;
    // 设置TraceId，默认从header获取traceId
    this.traceId = request.headers['traceid'];
    // 设置host
    this.host = os.hostname();
  }
}
