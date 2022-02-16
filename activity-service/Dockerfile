FROM node:17-alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install
# build the app
RUN npm run tsc

# MULTI-STAGE BUILD
FROM node:17-alpine
# working directory
WORKDIR /usr/src/app
# copy build from previous stage
COPY --from=build /usr/src/app .
# create and set non-root USER
RUN chown node:node ./
USER node

CMD ["node", "build/src/index.js"]