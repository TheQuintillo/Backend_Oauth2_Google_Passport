import "module-alias/register";
import express from "express";
import path from "path";

require("@services/Auth.service");

const router = express.Router();

router.get("^/$|index(.html)?", (req, res) => {
  res.send('<a href="login/auth/google">AUTH CON GOOGLE</a>');
});

router.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "CARPETA", "404.html"));
  res.status(404).send("PAGINA NO ENCONTRADA 404.HTML");
});

router.get("/login/protected", (req, res) => {
  res.status(401).send("Necesita Iniciar Sesión");
});

export default router;
