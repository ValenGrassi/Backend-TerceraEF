import { Router } from "express";
import { productosGetController } from "../controllers/api/productsGetController.js";
import { productosPostController } from "../controllers/api/productsPostController.js";
import { productManager } from "../dao/productManager.js";
import { autenticacion } from "../middlewares/autenticacion.js";

export const routerProducts = Router();

routerProducts.post("/", autenticacion, productosPostController);
routerProducts.get("/", productosGetController)

routerProducts.put("/:code", async (req,res,next) => {
        try{
            const cambio = req.body
            const codigoProducto = req.params.code;
            const producto = productManager.actualizarUnoConCódigo(codigoProducto, cambio)
            res.status(201).json(producto)
        }
        catch(error){
            next(error)
        }
})

routerProducts.delete("/:code", async (req,res,next) => {
    try {
        const codigoProducto = req.params.code;
        const producto = productManager.borrarUnoConCódigo(codigoProducto)
        res.status(201).json(producto)
    } 
    catch (error) {
        next(error)
    }
})