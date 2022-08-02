import passport from "passport";
import session from "express-session";
import express from "express";

const app = express();

app.use(
  session({
    secret: process.env.SESSION_AUTH_GOOGLE,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 365 * 2 * 24 * 120 * 1000,
      domain: "localhost",
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

export default app;
