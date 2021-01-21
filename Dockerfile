FROM node:12-alpine AS STAGE_BUILD

WORKDIR /work_dir

ADD package*.json /work_dir/
RUN npm ci

ADD . /work_dir/

RUN cp .env.example .env
RUN npm run lint
RUN npm run test
RUN npm run build

FROM node:12-alpine AS STAGE_SERVE

WORKDIR /work_dir

ARG NODE_ENV=production
ADD package*.json /work_dir/
RUN npm ci && npm cache clean -f

COPY --from=STAGE_BUILD /work_dir/.env /work_dir/.env
COPY --from=STAGE_BUILD /work_dir/dist/ /work_dir/dist/

EXPOSE 4000

CMD ["node", "dist/server.js"]
