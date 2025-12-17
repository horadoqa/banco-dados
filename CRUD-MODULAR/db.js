const { Pool } = require('pg');

const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin123',
  database: process.env.DB_NAME || 'banco_horadoqa',
  port: process.env.DB_PORT || 5432
});

module.exports = db;