import "module-alias/register";
import express from "express";
import { isLoggedIn } from "./RoutesAuthGoogle";

const router = express.Router();

/// /////// ROUTES RAIZ & 'NOT FOUND' ///////////

router.get("/", isLoggedIn, (req, res) => {
  res.send(
    '<a href="/user/profile">PERFIL</a> Y <a href="/user/panel">PANEL</a>',
  );
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.send("BIENVENIDOS AL PERFIL DE USUARIO");
});

router.get("/panel", isLoggedIn, (req, res) => {
  res.send(`Registra un nuevo Producto: `);
});

export default router;
