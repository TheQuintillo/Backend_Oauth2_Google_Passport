import express from 'express';
import path from 'path';

const app = express();
const router = express.Router();


// ROUTES '/'
router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'CARPETA', 'index.html'));
    res.send('REGISTER WEB ROUTA /')
});

// ROUTES '/register'
router.get('/register', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'register', 'register.html'));
    res.send('REGISTER WEB ROUTA /register')
});

console.log(path.join(__dirname))

// ROUTES 'NOT FOUND'
router.get('/*', (req, res)=>{
    res.status(404).sendFile(path.join(__dirname, 'CARPETA', '404.html'));
    res.status(404).send('PAGINA NO ENCONTRADA 404.HTML');
})

module.exports = router;