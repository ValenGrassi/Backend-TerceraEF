import { userManager } from "../dao/usersManager.js"
import { criptografiador } from "../utils/criptografia.js"

class AuthenticationService {
    constructor({ userManager,criptografiador }) {
        this.userManager = userManager
        this.criptografiador = criptografiador
    }
    async login(email,password) {
        try {
            const user = await userManager.encontrarUnoConValor({email})
            const compare = criptografiador.comparar(password, user.password)
            if(!compare){throw new Error("error de autenticacion")}
            criptografiador.generarToken(user)
            return user
        } catch (error) {
            throw new Error("error de autenticacion")
        }
        
    }
}

export const authenticationService = new AuthenticationService({
    userManager: userManager,
    criptografiador: criptografiador
})