FROM node:16-slim AS build
RUN sed -i 's/deb.debian.org/mirrors.163.com/g' /etc/apt/sources.list
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
COPY . .
RUN yarn && yarn run build && rm -fr node_modules && yarn --production

FROM node:16-slim
WORKDIR /home/work

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

ENV APP_NAME=demo
ENV NODE_ENV=production
ENV TZ=Asia/Shanghai

COPY --from=0 package.json .
COPY --from=0 node_modules/ node_modules/
COPY --from=0 app/ app/

EXPOSE 7001
CMD [ "dumb-init", "node", "--enable-source-maps", "app" ]
