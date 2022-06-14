import 'module-alias/register';
import express from 'express';
import morgan from 'morgan';
import Path from 'path';
import Fs from 'fs';

const app = express();
const path = Path;
const fs = Fs;

// MORGAN LOGS
app.use(morgan('combined'));

// PORT
const PORT = process.env.PORT || 3000;

// STATIC FILES
app.use('/', express.static(path.join(__dirname, '/public')));

// ROUTES
app.use('/', require('./routes/RoutesWeb'));
app.use('/register', require('./routes/RoutesWeb'));
app.use('/*', require('./routes/RoutesWeb'));


// SERVER ON
app.listen(PORT, () => {console.log(`SERVER ON PORT ${PORT}`)});