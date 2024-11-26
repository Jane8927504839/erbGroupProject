# 廚具商城

## 專案介紹

這是一個廚具商城的全棧應用，包括前端和後端部分。前端使用 Vue.js 開發，後端使用 Node.js 和 Express 開發，數據庫使用 MongoDB。

## 專案結構
```
project/ 
        ├── client/ # 前端代碼 
        ├── server/ # 後端代碼
        ├── .vscode/ # VS Code 配置 
        ├── docker-compose.yml # Docker Compose 配置文件 
        ├── README.md # 項目說明文件 
        └── .env # 環境變量配置
```

## 使用 Docker Compose 啟動專案

### 安裝 Docker 和 Docker Compose

確保你已經安裝了 Docker 和 Docker Compose。如果尚未安裝，請參考以下鏈接進行安裝：

- [Docker 安裝指南](https://docs.docker.com/get-docker/)
- [Docker Compose 安裝指南](https://docs.docker.com/compose/install/)

### 啟動專案

在項目根目錄下運行以下命令來啟動專案：

```sh
docker-compose up -d
```
這將啟動前端、後端和 MongoDB 服務

### 停止專案

如需停止專案，運行以下命令：

```sh
docker-compose down
```

## 手動啟動方式

### 前端啟動方式

進入 client 目錄並安裝依賴：

```sh
cd client
npm install
```

運行以下命令啟動前端開發伺服器：

```sh
npm run serve
```
前端開發伺服器將運行在 http://localhost:8080。

### 後端啟動方式

進入 server 目錄並安裝依賴：

```sh
cd server
npm install
```

確保你的本地 MongoDB 服務器正在運行。docker 中使用的 MongoDB 為 5.0 版本。如果遇到問題，請嘗試降低版本。

運行以下命令啟動後端伺服器：

```sh
npm run dev
```

後端伺服器將運行在 http://localhost:5003。

### 初始化產品數據

進入 server 目錄，修改數據庫連結配置後運行insertProducts.js

### 前後端同時啟動

進入 server 目錄並運行以下命令啟動前後端伺服器

```sh
npm run dev:full
```

這樣，你就可以在瀏覽器中訪問 http://localhost:8080，並使用完整的廚具商城應用。

