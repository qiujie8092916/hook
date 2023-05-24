# 执行顺序是加速构建速度的**关键中的关键**

# 第一阶段：安装依赖
FROM stefanwin/node-alpine-pnpm AS dependencies

# 设置工作目录
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm config set registry https://registry.npmjs.org/ && \
		pnpm install --frozen-lockfile

# 第二阶段：构建阶段
FROM dependencies AS builder

# 设置工作目录
WORKDIR /usr/src/app

COPY . .

# 执行构建命令
RUN pnpm run build

# 第三阶段：最终镜像
FROM stefanwin/node-alpine-pnpm AS runner

# 设置当前工作目录
WORKDIR /usr/src/app

# 矫正时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' > /etc/timezone

COPY --from=dependencies /usr/src/app/package.json /usr/src/app/pnpm-lock.yaml ./

ENV NODE_ENV "production"

# 安装生产依赖
RUN pnpm config set registry https://registry.npmjs.org/ && \
    pnpm install --frozen-lockfile --production

# 拷贝构建的应用程序
COPY --from=builder /usr/src/app/dist/ ./dist/

CMD ["node", "dist/main"]

EXPOSE 8080
