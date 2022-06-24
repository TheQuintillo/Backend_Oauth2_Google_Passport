import "module-alias/register";
import express from "express";

const router = express.Router();

/// /////// ROUTES RAIZ & 'NOT FOUND' ///////////

router.get("/", (req, res) => {
  res.send(
    '<a href="user/profile">PERFIL</a> Y <a href="user/panel">PANEL</a>',
  );
});

router.get("/profile", (req, res) => {
  res.send("BIENVENIDOS AL PERFIL DE USUARIO");
});

router.get("/panel", (req, res) => {
  res.send("BIENVENIDOS AL PANEL DEL USUARIO");
});

export default router;
