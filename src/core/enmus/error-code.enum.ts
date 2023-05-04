/**
 * 系统使用到的状态码
 */
// 0-1000 范围
export enum ErrorCode {
    TIME_OUT = -1, // 系统繁忙
    SUCCESS = 0, // 操作成功
    // 系统段 100-1000
    AUTH_TOKEN_EXPIRED = 100, // TOKEN 过期
    USER_NOTFOUND = 200, //找不到用户信息

    // 参数段 1000-2000
    PARAM_ERROR = 1000, // 参数错误
}
