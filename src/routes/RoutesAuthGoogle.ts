import "module-alias/register";
import express from "express";
import passport from "passport";
import main from "@middlewares/PrismaCreateUser.middleware";

require("@services/Auth.service");

const router = express.Router();

/// ///////// FUNCTION isLoggedIn /////////////
const isLoggedIn = (req: any, res: any, next: any) => {
  req.user ? next() : res.sendStatus(401);
};

/// /////// ROUTES RAIZ & 'NOT FOUND' ///////////
router.get("^/$|index(.html)?", (req, res) => {
  res.send('<a href="auth/google">AUTH CON GOOGLE LOGIN</a>');
});

/// ////// ROUTES AUTHENTICATION WITH GOOGLE.COM /////////////
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
  res.send(
    `HELLO ${req.user.username} ${req.user.emails} <img src="${req.user.photos}"></img> <a href="/login/logout">LogOut</a>`,
  );
  main(req.user.username, req.user.emails);
});
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
    return err;
    // cannot access session here
  });
});

export default router;
