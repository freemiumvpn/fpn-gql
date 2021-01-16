FROM node:12-alpine AS STAGE_BUILD

WORKDIR /work_dir

ADD package*.json /work_dir/
RUN npm ci

ADD . /work_dir/

RUN npm run lint
RUN npm run test
RUN npm run build

FROM node:12-alpine AS STAGE_SERVE

WORKDIR /work_dir

ARG NODE_ENV=production
ADD package*.json /work_dir/
RUN npm ci && npm cache clean -f

COPY --from=STAGE_BUILD /work_dir/dist/ /work_dir/

EXPOSE 4000

CMD ["node", "server.js"]
