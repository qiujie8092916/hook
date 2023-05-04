FROM node:16-alpine AS builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# 设置工作目录
WORKDIR /usr/src/app

COPY . ./
RUN npm install && npm run build

COPY . .

FROM node:16-alpine
LABEL Name="one-piece-bi-service"
LABEL Version = '1.0.0'

ENV NODE_ENV production

WORKDIR /usr/src/app

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' > /etc/timezone
COPY --from=builder /usr/src/app/package*.json /usr/src/app/
COPY --from=builder /usr/src/app/node_modules/ /usr/src/app/node_modules/
COPY --from=builder /usr/src/app/dist/ /usr/src/app/dist/

CMD ["node", "dist/main"]

EXPOSE 8080
