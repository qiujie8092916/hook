import { ApiProperty } from '@nestjs/swagger';
import { FileUploadType } from 'src/constants';

export class FileUploadDto {
  @ApiProperty({
    description: '上传类型',
    enum: FileUploadType,
    example: FileUploadType.LOGO,
  })
  fileType: FileUploadType;

  @ApiProperty({ type: 'string', format: 'binary', description: '文件内容' })
  file: any;
}
