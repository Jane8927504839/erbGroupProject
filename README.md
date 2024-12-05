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
docker-compose up --build
```
這將啟動前端、後端和 MongoDB 服務

### 停止專案

如需停止專案，運行以下命令：

```sh
docker-compose down
```

### 常見問題處理

如果 `docker-compose up --build` 運行後應用出現問題，可以嘗試以下步驟：

1. 完全清理環境：
```sh
# 刪除所有相關的容器、網絡和卷
docker-compose down -v --remove-orphans
```

2. 強制重新構建（不使用緩存）：
```sh
# 強制重新構建所有容器
docker-compose build --no-cache
```

3. 啟動服務：
```sh
docker-compose up
```

這個過程會：
- 清除所有舊的容器和數據
- 完全重新構建所有映像，不使用任何緩存
- 重新創建和啟動所有服務

## 手動啟動方式

### 前端啟動方式

進入 client 目錄並安裝依賴：

```sh
cd client
npm install
```

運行以下命令啟動前端開發伺服器：

```sh
npm run dev
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

### 初始化數據

進入 server 目錄：

1. 初始化管理員賬號：
```sh
node insertUser.js
```
管理員賬號信息：
- 郵箱：admin@example.com
- 密碼：admin123

2. 初始化產品數據：
```sh
node insertProducts.js
```

### 前後端同時啟動

進入 server 目錄並運行以下命令啟動前後端伺服器：

```sh
npm run dev:full
```

這樣，你就可以在瀏覽器中訪問 http://localhost:8080，並使用完整的廚具商城應用。

