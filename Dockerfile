# syntax=docker/dockerfile:1
ARG NODE_VERSION_TAG=18.15.0
ARG NODE_IMAGE=node:$NODE_VERSION_TAG
ARG BUILD_FOLDER=/build
ARG WORK_DIR=/src


FROM $NODE_IMAGE as install-dev-deps
ARG WORK_DIR
WORKDIR $WORK_DIR
ENV NODE_ENV=development
COPY . .
RUN rm -rf node_modules
RUN npm ci
RUN npm run build

FROM $NODE_IMAGE as setup-project
ARG WORK_DIR
WORKDIR $WORK_DIR
ENV NODE_ENV=production
COPY ./package* ./
RUN npm ci

FROM $NODE_IMAGE as final
ARG WORK_DIR
WORKDIR $WORK_DIR
ARG BUILD_FOLDER
USER node
WORKDIR $WORK_DIR
EXPOSE 9090
COPY --from=install-dev-deps --chown=node:node $WORK_DIR/$BUILD_FOLDER ./$BUILD_FOLDER
COPY --from=install-dev-deps --chown=node:node $WORK_DIR/.env ./
COPY --from=setup-project --chown=node:node $WORK_DIR/package*.json ./
COPY --from=setup-project --chown=node:node $WORK_DIR/node_modules ./node_modules
CMD npm run start:prod
HEALTHCHECK --interval=5s --timeout=60s --retries=10 CMD curl -f http://localhost:9090/api/health || exit 1