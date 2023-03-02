# Daddy's Expense Tracker
以 Node.js、Express、及 MongoDB 打造的全端應用程式，用來幫助紀錄生活開銷

## 實作重點
- 使用 Express 建構 MVC 模式的應用程式
- 使用 express.Router 建立模組路由
- 透過 Handlebars 樣板引擎產生 HTML 檔案
- 透過 Mongoose 語法操作 MongoDB 資料庫完成 CRUD 功能
- 使用 Passport.js 套件實行本地、臉書驗證功能
- 使用 bcrypt.js 套件將使用者密碼加密
- 建立 .env 管理敏感資訊
- 部署專案至 Heroku
### 測試帳號
- 帳號：user1@example.com
- 密碼：12345678


![alt 首頁](https://i.imgur.com/G6bR6Bk.gif)

## Installation

### Environment
* [Node.js v10.15.0](https://nodejs.org/en/download/)
* [Express v4.17.1](https://www.npmjs.com/package/express)

### Clone
clone repository to your local computer
```
$ git clone https://github.com/tsengm6h6/Expense-tracker.git
```

### Setup
1. Enter the directory
```
$ cd expense-tracker
```

2. Install npm packages
```
$ npm install
```

3. Install nodemon
```
$ npm install nodemon
```

4. Activate the server
```
$ npm run dev
```

5. Find the below message for successful activation
```
App is running on http://localhost:3000
```
You can visit the application on http://localhost:3000 now
