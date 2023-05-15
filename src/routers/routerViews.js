import {Router} from "express"
import { productManager } from "../dao/productManager.js";
import { autenticacionRedirect } from "../middlewares/autenticacion.js";

const routerViews = Router()

routerViews.get("/registro", (req,res,next) => {
    res.render("register", {pageTitle: "Registro"})
})

routerViews.get("/login", (req,res,next) => {
    res.render("login", {pageTitle: "Login"})
})

routerViews.get("/", autenticacionRedirect, (req,res,next) => {
    res.redirect("/user")
})

routerViews.get("/user",autenticacionRedirect, (req,res,next) => {
    res.render("user", {pageTitle: "User", user: req.session.user})
    console.log(req.session.user)
})

routerViews.get("/realtimeproducts", async (req,res) => {
    const productos = await productManager.encontrar()
    res.render("realTimeProducts", {hayProductos: productos.length > 0, productos})
})

export default routerViews