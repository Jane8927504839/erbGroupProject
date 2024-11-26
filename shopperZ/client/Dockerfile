# 構建階段
FROM node:16 as build-stage
WORKDIR /app

COPY package*.json ./

# 設置 npm 緩存目錄
RUN npm config set cache /app/.npm-cache --global

# 安裝依賴
RUN npm install -g @vue/cli
RUN npm ci

# 複製其餘源代碼
COPY . .

# 構建應用
RUN npm run build

# 生產階段
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080  
CMD ["nginx", "-g", "daemon off;"]