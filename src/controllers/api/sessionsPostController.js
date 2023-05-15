import userModel from "../../models/datosFuturoUsuario.js"

export async function registerPostController(req, res, next) {
    try {
        const {firstName, lastName, email, age, password} = req.body
        const existe = await userModel.findOne({email})
        if(existe) {return res.status(400).send({status: "error", error: "Este mail ya esta registrado"})}
        const user = {
            firstName,
            lastName,
            email,
            age,
            password
        }
        let result = await userModel.create(user)
        console.log(result)
        res.send({status: "success", message: "Usuario Registrado!"})
    }
    catch (error) {
        next(error);
    }
}

export async function loginPostController(req,res,next){
    try {
        const {email,password} = req.body
        const rol = "admin"
        if(email == "adminCoder@coder.com" && password == "adminCod3r123"){req.session.user = {
            firstName: "coderhouse",
            email: email,
            password: password,
            rol: rol,
        }; console.log(ok)}
        const user = await userModel.findOne({email,password})
        if(!user){return res.status(400).send({status: "error", error: "no existe ese mail o la contraseña es incorrecta"})}

        req.session.user = {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            age: user.age,
            rol: user.rol
        }
        res.send({status: "success", message: "Logueo correcto!", payload: req.session.user})
    } catch (error) {
        next(error)
    }
}