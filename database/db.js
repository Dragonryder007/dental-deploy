import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MOCK_DB_DIR = path.join(__dirname, 'mock_db');

dotenv.config();

const dbConfig = {
  host: process.env.MYSQL_HOST || '193.203.184.191',
  port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
  user: process.env.MYSQL_USER || 'u817245059_adminV',
  password: process.env.MYSQL_PASSWORD || 'Vdental1',
  database: process.env.MYSQL_DATABASE || 'u817245059_vdental'
};

let pool;
let useMockJson = false;

function getTableFromSql(sql) {
  const s = sql.toLowerCase();
  if (s.includes('leads')) return 'leads';
  if (s.includes('gallery')) return 'gallery';
  if (s.includes('appointments')) return 'appointments';
  if (s.includes('reviews')) return 'reviews';
  return 'unknown';
}

function readMockJson(table) {
  if (!fs.existsSync(MOCK_DB_DIR)) fs.mkdirSync(MOCK_DB_DIR, { recursive: true });
  const filePath = path.join(MOCK_DB_DIR, `${table}.json`);
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) { return []; }
}

function writeMockJson(table, data) {
  const filePath = path.join(MOCK_DB_DIR, `${table}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function initDb() {
  try {
    // On managed hosts like Hostinger the DB user cannot CREATE DATABASE.
    // Only try to auto-create the database when explicitly allowed (local dev).
    const allowCreate = String(process.env.MYSQL_ALLOW_CREATE_DB || '').toLowerCase() === 'true';

    if (allowCreate) {
      const connection = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password
      });
      console.log(`Checking/Creating database: ${dbConfig.database}...`);
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
      await connection.end();
    } else {
      console.log(`Using existing database: ${dbConfig.database} (skip CREATE)`);
    }

    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log('✅ MySQL Pool Created');

    // 3. Create tables
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        source VARCHAR(50) NOT NULL,
        service VARCHAR(255),
        message TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'new',
        createdAt DATETIME NOT NULL
      )
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        date VARCHAR(50) NOT NULL,
        time VARCHAR(50) NOT NULL,
        service VARCHAR(255),
        issue TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        createdAt DATETIME NOT NULL,
        UNIQUE (date, time)
      )
    `);
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        imageUrl TEXT NOT NULL,
        createdAt DATETIME NOT NULL
      )
    `);
    console.log('✅ Database Tables Verified');
    return pool;
  } catch (err) {
    // Only bypass if we are explicitly in a local dev environment without a DB
    if (process.env.NODE_ENV !== 'production' && (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND')) {
      console.warn(`⚠️ MySQL connection failed to ${dbConfig.host}. Bypassing with JSON mock database for local development.`);
      useMockJson = true;
      return null;
    }
    console.error('❌ CRITICAL: Database connection failed.');
    console.error('Error Code:', err.code);
    console.error('Check your .env variables: MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE');
    throw err;
  }
}

export const dbRun = async (sql, params = []) => {
  if (useMockJson) {
    const table = getTableFromSql(sql);
    const data = readMockJson(table);
    const sqlUpper = sql.trim().toUpperCase();

    if (sqlUpper.startsWith('INSERT')) {
      const newId = data.length > 0 ? Math.max(...data.map(i => i.id || 0)) + 1 : 1;
      const newItem = { id: newId, createdAt: new Date().toISOString() };
      
      // Map common table parameters for the app
      if (table === 'leads') [newItem.name, newItem.phone, newItem.email, newItem.source, newItem.service, newItem.message, newItem.status] = params;
      else if (table === 'appointments') [newItem.name, newItem.phone, newItem.email, newItem.date, newItem.time, newItem.service, newItem.issue, newItem.status] = params;
      else if (table === 'gallery') [newItem.category, newItem.title, newItem.imageUrl] = params;
      else if (table === 'reviews') [newItem.name, newItem.email, newItem.phone, newItem.rating, newItem.comment, newItem.status] = params;
      
      data.push(newItem);
      writeMockJson(table, data);
      return { lastID: newId, changes: 1 };
    }

    if (sqlUpper.startsWith('UPDATE')) {
      const id = params[params.length - 1];
      const idx = data.findIndex(i => i.id == id);
      if (idx !== -1) {
        data[idx].status = params[0]; // Most updates in this app are for 'status'
        writeMockJson(table, data);
        return { changes: 1 };
      }
    }

    if (sqlUpper.startsWith('DELETE')) {
      const id = params[0];
      const filtered = data.filter(i => i.id != id);
      writeMockJson(table, filtered);
      return { changes: 1 };
    }
    return { lastID: 0, changes: 0 };
  }

  if (!pool) throw new Error('Database pool not initialized.');
  const [result] = await pool.execute(sql, params);
  return { lastID: result.insertId, changes: result.affectedRows };
};

export const dbAll = async (sql, params = []) => {
  if (useMockJson) {
    const table = getTableFromSql(sql);
    let data = readMockJson(table);
    const sqlLower = sql.toLowerCase();

    // Basic mock filtering for Reviews and Reminders
    if (sqlLower.includes("status = 'published'")) data = data.filter(i => i.status === 'published');
    if (sqlLower.includes("date = ?")) data = data.filter(i => i.date === params[0]);
    
    // Basic sorting by ID/Date
    if (sqlLower.includes('order by')) {
      data.sort((a, b) => (b.id || 0) - (a.id || 0));
    }
    
    return data;
  }

  if (!pool) throw new Error('Database pool not initialized.');
  const [rows] = await pool.execute(sql, params);
  return rows;
};

export const dbGet = async (sql, params = []) => {
  if (useMockJson) {
    const table = getTableFromSql(sql);
    const data = readMockJson(table);
    const id = params[0];
    return data.find(i => i.id == id) || null;
  }

  if (!pool) throw new Error('Database pool not initialized.');
  const [rows] = await pool.execute(sql, params);
  return rows[0] || null;
};
