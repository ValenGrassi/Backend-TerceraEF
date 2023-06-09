import { DatosFuturoUsuario } from "../../models/DatosFuturoUser.js"
import { userRepository } from "../../repositories/usersRepository.js"
import { authenticationService } from "../../services/auth.service.js"
import { usuariosService } from "../../services/users.service.js"

export async function registerPostController(req, res, next) {
    try {
        const email = req.body.email
        // const existe = await userManager.encontrarUnoConValor({email: email})
        const existe = await userRepository.encontrarUnoConValor({email:email}, { returnDto: true })
        console.log({"error":existe})
        
        if(existe) {
            return new Error("status 400: el mail ya existe")
        }

        const datosFuturoUsuario = new DatosFuturoUsuario(req.body).toDto()
        console.log(datosFuturoUsuario)
        const usuarioRegistrado = await usuariosService.registrar(datosFuturoUsuario)
        return res.status(201).send({status: "success", message: "Usuario Registrado!"})
    }
    catch (error) {
        next(error);
    }
}

export async function loginPostController(req,res,next){
    try {
        const {email,password} = req.body
        const rol = "admin"
        const user = await userRepository.encontrarUnoConValor({email}, { returnDto: true })
        if(user){
            if(authenticationService.login(email,password)){
                req.session.user = {
                name: `${user.nombre} ${user.apellido}`,
                email: user.email,
                age: user.edad,
                rol: user.rol
            };
            console.log("rol del usuario: " + user.rol)
        }}

        if(!user && email == "adminCoder@coder.com" && password == "adminCod3r123"){
            req.session.user = {
            name: "coderhouse",
            email: email,
            password: password,
            rol: rol,
            }
            console.log("rol del usuario: " + rol)
        }       
        
        if(!user && email != "adminCoder@coder.com" && password != "adminCod3r123"){
            throw new Error("Error 401: no estas autorizado.")
        }
        res.sendStatus(201)
    } catch (error) {
        next(error)
        console.log(error)
    }
}