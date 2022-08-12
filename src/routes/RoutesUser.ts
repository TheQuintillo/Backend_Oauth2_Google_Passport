import "module-alias/register";
import express from "express";
import { isLoggedIn } from "./RoutesAuthGoogle";
import ProductsController from "../controllers/Products.controller";
import OrdersController from "@src/controllers/Orders.controller";
import app from "@src/middlewares/Session.middleware";
import { PrismaClient } from "@prisma/client";
import { nextTick } from "process";
import { json } from "stream/consumers";

const router = express.Router();

//const prisma = new PrismaClient();

const newProduct = new ProductsController();
const newOrder = new OrdersController();
const prisma = new PrismaClient();
/// /////// ROUTES RAIZ & 'NOT FOUND' ///////////

router.get("/", (req, res) => {
  res.send(
    '<a href="/user/profile">PERFIL</a> Y <a href="/user/panel">PANEL</a>',
  );
});

router.get("/profile", (req, res) => {
  res.send("BIENVENIDOS AL PERFIL DE USUARIO");
});

router.get("/panel", (req, res) => {
  res.send(`Registra un nuevo Producto: 
  <form action="/user/products/add" method="POST">
  <input type="text" placeholder="Nombre del Producto" name="name">
  <input type="number" placeholder="Precio del Producto" name="price">
  <input type="text" placeholder="Color del Producto" name="colors">
  <input type="text" placeholder="Color del Producto" name="colors">
  <input type="text" placeholder="Talla del Producto" name="sizes">
  <input type="text" placeholder="Talla del Producto" name="sizes">
  <input type="text" placeholder="URL Foto del Producto" name="photos">
  <button type="submit">Registrar Producto</button>
  </form>
  
  Actualizar un Producto: 
  <form action="/user/products/14" method="POST">
  <input type="text" placeholder="Nombre del Producto" name="name">
  <input type="number" placeholder="Precio del Producto" name="price">
  <input type="text" placeholder="Color del Producto" name="colors">
  <input type="text" placeholder="Color del Producto" name="colors">
  <input type="text" placeholder="Talla del Producto" name="sizes">
  <input type="text" placeholder="Talla del Producto" name="sizes">
  <input type="text" placeholder="URL Foto del Producto" name="photos">
  <button type="submit">Update Producto</button>
  </form>`);
});

router.post("/product/add", async (req, res, next) => {
  try {
    const createProduct = await newProduct.createProduct(req.body);
    console.log(req.body);
    res.json(createProduct);
  } catch (error) {
    next(error);
  }
});

router.get("/products/", async (req, res, next) => {
  try {
    const products = await newProduct.findProducts({});
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await newProduct.findProduct({ id: Number(id) });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await newProduct.deleteProduct( { id: Number(id) });
    res.json(deleteProduct);
    res.send("DELETED");
  } catch (error) {
    next(error);
  }
});

router.patch("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateProduct = await newProduct.updateProduct({ id: Number(id) }, req.body );
    console.log(updateProduct);
    console.log(req.body);
    res.json(updateProduct);
  } catch (error) {
    next(error);
  }
})

router.get("/order/", async (req, res, next) => {
  try {
    const order = await newOrder.findOrders({});
    console.log(res.json(order));
  } catch (error) {
    next(error);
  }
});

export default router;
