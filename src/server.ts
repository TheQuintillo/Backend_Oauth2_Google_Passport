import "module-alias/register";
import express from "express";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import routeUser from "@routes/RoutesUser";
import routeIndex from "@routes/RoutesIndex";
import routeAuthGoogle from "@routes/RoutesAuthGoogle";
import cors from "cors";
import corsOptions from "@controllers/CorsOptions.controller";
import sessionAuth from "@middlewares/Session.middleware";

const app = express();
const env = dotenv.config();
dotenvExpand.expand(env);

/// ///// SESSION USER /////////
app.use(sessionAuth);

// PORT
const PORT = process.env.PORT || 3000;

// MORGAN LOGS
app.use(morgan("combined"));

// STATIC FILES
app.use("/", express.static(path.join(__dirname, "/public")));

// ROUTES
app.use("/user", routeUser);
app.use("/login", routeAuthGoogle);

// ROOT ROUTE
app.use("/", routeIndex);
app.use("/*", routeIndex);

// SERVER ON
app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});
