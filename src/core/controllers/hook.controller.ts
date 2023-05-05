/*
 * @Author: jie.q qiujieee_empty@outlook.com
 * @Date: 2023-05-05 10:22:36
 * @LastEditors: jie.q qiujieee_empty@outlook.com
 * @LastEditTime: 2023-05-05 10:35:49
 * @FilePath: /yuque_hook/src/core/controllers/hook.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Controller, Post, Req, Body, Logger } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('/hook')
@ApiExcludeController()
export class HookController {
  private readonly logger = new Logger(HookController.name);

  @Post()
  index(@Body() payload, @Req() query): string {
    this.logger.log(JSON.stringify(payload));
    this.logger.log(JSON.stringify(query));
    return 'success';
  }
}
