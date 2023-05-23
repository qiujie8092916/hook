/*
 * @Author: jie.q qiujieee_empty@outlook.com
 * @Date: 2023-05-05 10:22:36
 * @LastEditors: qiujie qiujieee_empty@outlook.com
 * @LastEditTime: 2023-05-23 17:32:11
 * @FilePath: /yuque_hook/src/core/controllers/hook.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('/midjourney')
@ApiExcludeController()
export class MidjourneyController {
  private readonly logger = new Logger(MidjourneyController.name);

  @Post('hook')
  hook(@Body() payload) {
    this.logger.log(JSON.stringify(payload));
  }
}
