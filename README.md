# next


使用该模板快速开始一个基于NestJS的Node.js服务端项目
- 支持开箱即用的ORM（基于TypeORM）
- 支持通用的基础服务Service，只需要少量的代码就能完成增删改查（支持分页）功能
- 支持通用的错误异常处理
<!-- - [待完成] 支持统一的日志治理 -->
## 1. 快速开始
### 1.1 环境要求
开始工作之前，请先确认
- Node.js 16.x 及以上
- pnpm  7.x 及以上
<!-- - mysql 5.x 及以上 -->

**安装pnpm**
```shell
npm install -g pnpm
```

### 1.2 项目配置

```shell
# 安装依赖包
pnpm install
```

启动项目时需要注入必要的环境变量，系统会默认读取项目目录下的 `.env*` 文件。

下面是模板样例，可以直接在控制台运行下列命令即可创建
```
cat << EOF >> .env.development.local

# 服务端口
PORT=8080

EOF
```

```shell
# 开启开发调试
npm run start:debug
```

## 项目结构
```
├── src
│   ├── common             # 公共的服务，如文件上传
│   ├── constants          # 系统常量，通用的枚举值
│   ├── core               # 核心库，包含通用的装饰器、拦截器、鉴权、实体基类、服务基类
│   ├── health             # 健康检查
│   ├── metrics            # 暴露的监控指标
│   ├── platform           # 此处放置具体的业务代码，按文件夹进行存储，一个模块一个文件夹
│   ├── user               # 用户鉴权和，OAGW相关的用户角色接口服务
│   ├── utils              # 公共的工具类
│   ├── app.module.t       # 系统主模块入口
│   └── main.ts            # 程序入口
├── test                   # 单元测试
├── .dockerignore          # Docker构建忽略文件配置
├── .editorconfig          # 统一编辑器配置
├── .env.development.local # 本地开发配置文件
├── .eslintrc.js
├── .gitignore
├── .gitlab-ci.yml
├── .npmrc
├── .prettierrc
├── Dockerfile
├── README.md
├── declarations.d.ts
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.build.json
└── tsconfig.json
```

## 注意事项
- 安装依赖时请手动指定版本号，不要设置过于宽泛的语义版本
  - 推荐  `pnpm install express@1.0.0`
  - 不推荐 `pnpm install express`
