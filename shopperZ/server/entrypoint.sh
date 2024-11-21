#!/bin/sh

# 檢查標誌文件是否存在
if [ ! -f /app/.initialized ]; then
  echo "Running insertProducts.js for the first time..."
  node /app/insertProducts.js
  # 創建標誌文件
  touch /app/.initialized
else
  echo "insertProducts.js has already been run."
fi

# 啟動主應用程序
exec "$@"