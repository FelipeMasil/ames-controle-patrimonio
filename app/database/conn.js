import dotenv from 'dotenv';
dotenv.config()

import mysql from 'mysql2/promise'


const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

export default db
