import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import router from './routes.js'


const app = express();

app.use(express.static('./app/public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(router)

app.listen(3333, () => console.log(`Rodando na porta ${process.env.SERVER_PORT}`))