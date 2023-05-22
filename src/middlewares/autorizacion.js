export function Administrador(req,res,next){
    const user = req.session.user
    if(user.rol != "admin"){
        throw new Error("Error 401: no estas autorizado.")
    }
    next()
}

export function Usuario(req,res,next){
    const user = req.session.user
    if(user.rol != "usuario"){
        throw new Error("Error 401: no estas autorizado")
    }
    next()
}