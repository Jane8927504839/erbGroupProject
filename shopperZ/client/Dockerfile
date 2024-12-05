# 構建階段
FROM node:16-alpine as build-stage
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

# 生產階段
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080  
CMD ["nginx", "-g", "daemon off;"]