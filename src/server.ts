import 'module-alias/register';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import router from '@routes/RoutesWeb';
import cors from 'cors';
import { corsOptions } from '@controllers/CorsOptions.controller';

const app = express();
const env = dotenv.config();
dotenvExpand.expand(env);

// PORT
const PORT = process.env.PORT || 3000;

// MORGAN LOGS
app.use(morgan('combined'));

// STATIC FILES
app.use('/', express.static(path.join(__dirname, '/public')));

// ROUTES
app.use('/',router);
app.use('/register', router);
app.use('/*', router);

// SERVER ON
app.use(cors(corsOptions));
app.listen(PORT, () => {console.log(`SERVER ON PORT ${PORT}`)});