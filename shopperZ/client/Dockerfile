# 構建階段
FROM node:16 as build-stage
WORKDIR /app
RUN npm install -g @vue/cli
COPY package*.json ./
RUN npm install
COPY . .
# RUN chmod +x node_modules/.bin/vue-cli-service  # 確保 vue-cli-service 可執行
RUN npm run build

# 生產階段
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]