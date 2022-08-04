FROM node:16.14.0-alpine As builder

ENV NODE_VERSION 16.14.0
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/ppf_ui/ /usr/share/nginx/html
