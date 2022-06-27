import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import express from "express";
import passport from "passport";
import google from "passport-google-oauth";

const env = dotenv.config();
dotenvExpand.expand(env);

// SERIALIZE USERs
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// just some test model
const User = {
  findOrCreate(
    id: string,
    provider: string,
    email: string,
    photo: string,
    token: string,
    refreshTok: string,
    callback: (err: any, user: any) => void,
  ): void {
    callback(null, {
      username: `${id}`,
      provide: `${provider}`,
      email: `${email}`,
      photos: `${photo}`,
      Token: `${token}`,
      RefreshToken: `${refreshTok}`,
    });
  },
};
passport.use(
  new google.OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.PASSPORT_GOOGLE_CALLBACK_URL,
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: google.Profile,
      done: (error: any, user?: any) => void,
    ) => {
      User.findOrCreate(
        profile.displayName,
        profile.provider,
        profile.emails[0].value,
        profile.photos[0].value,
        accessToken,
        refreshToken,
        (err, user) => {
          if (err) {
            done(err);
          }
          done(null, user);
        },
      );
    },
  ),
);
passport.use(
  new google.OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.PASSPORT_GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    (
      req: express.Request,
      accessToken: string,
      refreshToken: string,
      profile: google.Profile,
      done: (error: any, user?: any) => void,
    ) => {
      User.findOrCreate(
        profile.displayName,
        profile.provider,
        profile.emails[0].value,
        profile.photos[0].value,
        accessToken,
        refreshToken,
        (err, user) => {
          if (err) {
            done(err);
          }
          done(null, user);
        },
      );
    },
  ),
);
