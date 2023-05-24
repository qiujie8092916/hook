/*
 * @Author: qiujie qiujieee_empty@outlook.com
 * @Date: 2023-05-22 21:36:22
 * @LastEditors: qiujie qiujieee_empty@outlook.com
 * @LastEditTime: 2023-05-24 17:25:14
 * @FilePath: /hook/src/core/controllers/index.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('/')
@ApiExcludeController()
export class IndexController {
  @Get()
  index(): string {
    return 'hello hook!';
  }
}
