import { SetMetadata } from '@nestjs/common';

// 公开访问
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
