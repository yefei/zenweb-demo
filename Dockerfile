FROM node:12-alpine

WORKDIR /home/work

ENV NODE_ENV=production
ENV TZ=Asia/Shanghai

# 先复制不常变化的文件执行构建，可以缓存过程
COPY .npmrc package.json yarn.lock ./
RUN npm config set unsafe-perm true \
  && yarn --production \
  && yarn cache clean

# 复制项目文件
COPY app/ app/

EXPOSE 7001
CMD [ "npm", "start" ]
