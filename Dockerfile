FROM node:12-slim AS build
COPY . .
RUN yarn && yarn run build && rm -fr node_modules && yarn --production

FROM node:12-slim
WORKDIR /home/work

ENV NODE_ENV=production
ENV TZ=Asia/Shanghai

COPY --from=0 package.json .
COPY --from=0 node_modules/ node_modules/
COPY --from=0 app/ app/

EXPOSE 7001
CMD [ "npm", "start" ]
