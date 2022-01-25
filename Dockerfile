FROM node:12-slim

WORKDIR /home/work

ENV NODE_ENV=production
ENV TZ=Asia/Shanghai

# 先复制不常变化的文件执行构建，可以缓存过程
COPY package.json package-lock.json ./
RUN npm i --production

# 复制项目文件
COPY app/ app/

EXPOSE 7001
CMD [ "npm", "start" ]
