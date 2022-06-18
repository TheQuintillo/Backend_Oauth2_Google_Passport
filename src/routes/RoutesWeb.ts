import 'module-alias/register';
import express from 'express';
import path from 'path';
import passport from 'passport';
import session from 'express-session';

require('@services/Auth.service');
const app = express();
const router = express.Router();

//////// SESSION USER /////////
router.use(session({ 
    secret: process.env.SESSION_AUTH_GOOGLE,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: (365 * 2 * 24 * 120 * 1000),
        domain: 'localhost',
    } }));
router.use(passport.initialize());
router.use(passport.session());

//////////// FUNCTION isLoggedIn /////////////
const isLoggedIn = (req:any, res:any, next:any) =>{
    req.user ? next() : res.sendStatus(401)
    console.log(req);
}

////////// ROUTES RAIZ & 'NOT FOUND' ///////////
router.get('/', (req, res, next)=>{
    res.send('<a href="/auth/google">AUTH CON GOOGLE</a>');
    console.log(req)
    req.session.regenerate
});


///////// ROUTES AUTHENTICATION WITH GOOGLE.COM /////////////
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
 }));
router.get('/auth/failure', (req, res)=>{
    res.send('FALLO EN LA AUTHENTICATION');
});
router.get('/protected', isLoggedIn, (req, res)=>{
    res.send(`HELLO ${req.user.username} <a href="/logout">LogOut</a>`);
    console.log(req.session)
});
router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
       res.redirect('/') // cannot access session here
      })
});

router.get('/*', (req, res)=>{
    res.status(404).sendFile(path.join(__dirname, 'CARPETA', '404.html'));
    res.status(404).send('PAGINA NO ENCONTRADA 404.HTML');
})

export default router