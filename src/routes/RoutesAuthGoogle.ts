import "module-alias/register";
import express, { request } from "express";
import passport from "passport";
/* import main from "@middlewares/PrismaCreateUser.middleware"; */
import UserController from "@controllers/User.controller";
import cookie from 'cookie';
import cookieParser from "cookie-parser";

const userCreate = new UserController();

require("@services/Auth.service");

const router = express.Router();

router.use(cookieParser('newToken', {decode: 'newToken'}));

/// ///////// FUNCTION isLoggedIn /////////////
export const isLoggedIn = (req: any, res: any, next: any) => {
  req.user ? next() : res.send(`Necesita iniciar Sesion <a href="/">Click Aquí</a>`);
};

// ////// ROUTES AUTHENTICATION WITH GOOGLE.COM /////////////
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/protected",
    failureRedirect: "/auth/failure",
  }),
);
router.get("/auth/failure", (req, res) => {
  res.send("FALLO EN LA AUTHENTICATION");
});
router.get("/protected", isLoggedIn, (req, res) => {
  res.setHeader('Set-Cookie', cookie.serialize('token', req.user.Token, {maxAge: 60 * 60 * 24 * 7, httpOnly: true, secure: true}))
  //res.cookie('new-Token', req.user.Token, {path: '/login', maxAge: 7, httpOnly: true, secure: true, })
  console.log(req);
  res.send(
    `HELLO ${req.user.username} ${req.user.email} <img src="${req.user.photos}"></img> <a href="/login/logout">LogOut</a>`,
  );
  userCreate.createUser(req.user);
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
    return err;
    // cannot access session here
  });
});

export default router;
