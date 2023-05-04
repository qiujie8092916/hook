# 第一阶段：安装依赖
FROM node:16-alpine AS dependencies

# 设置工作目录
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

# 安装依赖
RUN npm config set registry https://npm.xjjj.co/ && \
    npm ci

# 第二阶段：构建阶段
FROM dependencies AS builder

# 设置工作目录
WORKDIR /usr/src/app

COPY . .

# 执行构建命令
RUN npm run build

# 第三阶段：最终镜像
FROM node:16-alpine AS runner

# 设置当前工作目录
WORKDIR /usr/src/app

# 矫正时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' > /etc/timezone

COPY --from=dependencies /usr/src/app/package.json /usr/src/app/yarn.lock ./

ENV NODE_ENV "production"

# 安装生产依赖
RUN npm config set registry https://registry.npmjs.org/ && \
    npm ci --only=production

# 清除缓存
RUN npm cache clean --force

# 若有额外需要操作内容，请自行添加在此

# 拷贝构建的应用程序
COPY --from=builder /usr/src/app/dist/ ./dist/

CMD ["node", "dist/main"]

EXPOSE 8080