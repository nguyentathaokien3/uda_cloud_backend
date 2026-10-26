const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối CSDL MySQL trong Docker
const db = mysql.createPool({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USERNAME || 'app_user',
  password: process.env.DB_PASSWORD || 'app_pass',
  database: process.env.DB_NAME || 'rikkei_finalproject',
  port: process.env.DB_PORT || 3306
});

// Lấy danh sách bài viết blog
app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, title: 'Bài viết Blog 1', content: 'Chào mừng bạn đến với Cloud Blog trên AWS!' },
    { id: 2, title: 'Bài viết Blog 2', content: 'Deploy thành công bằng Docker và Nginx!' }
  ]);
});

// API kiểm tra danh mục
app.get('/api/v1/category', (req, res) => {
  res.json({ message: "Success", data: { categories: ["Công nghệ", "Tin tức", "AWS Cloud"] } });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend blog running on port ${PORT}`);
});