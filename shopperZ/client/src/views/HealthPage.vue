<template>
    <div class="health-container">
      <div class="status-box">
        <!-- 加載狀態 -->
        <div v-if="status === 'loading'" class="status-item">
          <div class="loading-spinner"></div>
          <h2>正在檢查服務器狀態...</h2>
        </div>
  
        <!-- 正常狀態 -->
        <div v-if="status === 'healthy'" class="status-item">
          <i class="fas fa-check-circle success-icon"></i>
          <h2>服務器運行正常</h2>
        </div>
  
        <!-- 錯誤狀態 -->
        <div v-if="status === 'error'" class="status-item">
          <i class="fas fa-times-circle error-icon"></i>
          <h2>服務器連接異常</h2>
        </div>
  
        <!-- 最後檢查時間 -->
        <p v-if="lastChecked" class="last-checked">
          最後檢查時間：{{ lastChecked }}
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HealthPage',
    data() {
      return {
        status: 'loading',
        lastChecked: null,
        checkInterval: null
      }
    },
    methods: {
      async checkHealth() {
        try {
          const response = await fetch('/api/health', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          if (data.status === 'OK') {
            this.status = 'healthy';
          } else {
            this.status = 'error';
          }
        } catch (error) {
          console.error('Health check failed:', error);
          this.status = 'error';
        }
        this.lastChecked = new Date().toLocaleString();
      }
    },
    mounted() {
      this.checkHealth()
      // 每30秒檢查一次
      this.checkInterval = setInterval(this.checkHealth, 30000)
    },
    beforeUnmount() {
      if (this.checkInterval) {
        clearInterval(this.checkInterval)
      }
    }
  }
  </script>
  
  <style scoped>
  .health-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
  }
  
  .status-box {
    text-align: center;
    padding: 2rem;
  }
  
  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .success-icon {
    color: #4caf50;
    font-size: 4rem;
  }
  
  .error-icon {
    color: #f44336;
    font-size: 4rem;
  }
  
  .last-checked {
    margin-top: 1rem;
    color: #666;
    font-size: 0.9rem;
  }
  
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style> 