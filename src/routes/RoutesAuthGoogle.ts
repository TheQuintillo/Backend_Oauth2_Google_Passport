import "module-alias/register";
import express from "express";
import passport from "passport";
/* import main from "@middlewares/PrismaCreateUser.middleware"; */
import UserController from "@controllers/User.controller";

const userCreate = new UserController();

require("@services/Auth.service");

const router = express.Router();

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
