import express from 'express';
import cors from 'cors';
import path from 'path';
// eslint-disable-next-line no-unused-vars
import sequelize from './database.js';
import { fileURLToPath } from 'url';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));


app.use('/api/auth', userRoutes);
app.use('/api', postRoutes);

export default app;