import { usersManager } from "../dao/usersManager.js";

class UsuariosService{
    async registrar(datosFuturoUsuario){
        const usuarioRegistrado = await usersManager.guardar(datosFuturoUsuario);
        return usuarioRegistrado;
    }
}

export const usuariosService = new UsuariosService()