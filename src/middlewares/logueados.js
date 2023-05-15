import {errorHandler} from "../errors/errorHandler.js"

export function logueadosError(req,res,next){
    if (!req.isAuthenticated()) {
        return next(new errorDePermisos())
    }
    next()
}

export function logueadosRedirect(req,res,next){
    if (!req.isAuthenticated()) {
        return res.redirect("/login")
    }
    next()
}