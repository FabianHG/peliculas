"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const usuarioDao_1 = require("../dao/usuarioDao");
const utils_1 = require("../utils/utils");
class UsuarioController {
    /**
     *  Nombre: insert
     *  Descripcion: insertar datos de un nuevo usuario
     *  Resultado: json con mensaje.
     */
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, nombre, apellidos } = req.body;
                // Verificar parametros
                if (username == null || password == null) {
                    return res.status(409).json({ message: "Los campos son requeridos" });
                }
                // Verificar longitud de caracteres
                if (username.length > 150) {
                    return res.status(500).json({ message: "La longitud maxima del usuario es de 150 caracteres" });
                }
                // Verificar nombre de usuario
                const verify = yield usuarioDao_1.dao.verificarUsuario(username);
                if (verify.length > 0) {
                    return res.status(500).json({ message: "El usuario ya existe" });
                }
                // Encriptar contraseña
                const encryptedPassword = yield utils_1.utils.hashPassword(password);
                // Llamar objetos
                const user = {
                    nombre,
                    apellidos,
                    username,
                    password: encryptedPassword
                };
                // Insercion de datos
                const result = yield usuarioDao_1.dao.insert(user);
                if (result.affectedRows > 0) {
                    return res.json({ message: "Datos guardados exitosamente" });
                }
                else {
                    return res.status(409).json({ message: result.message });
                }
                res.json(result);
            }
            catch (ex) {
                res.status(500).json({ message: ex.message });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
