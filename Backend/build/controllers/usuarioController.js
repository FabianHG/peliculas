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
const usuarioDAO_1 = require("../dao/usuarioDAO");
const utils_1 = require("../utils/utils");
class UsuarioController {
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, apellidos, username, password } = req.body;
                // Verificar parametros
                if (username == null || password == null) {
                    return res.status(409).json({ message: "Los campos son requeridos" });
                }
                // Verificar longitud de caracteres
                if (username.length > 350) {
                    return res.status(500).json({ message: "La longitud maxima del usuario es de 350 caracteres" });
                }
                // Verificar nombre de usuario
                const verify = yield usuarioDAO_1.dao.verificarUsuario(username);
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
                const result = yield usuarioDAO_1.dao.insert(user);
                if (result.affectedRows > 0) {
                    return res.json({ message: "Los datos han sido guardados" });
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
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield usuarioDAO_1.dao.lista();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    insertp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { titulo, anio, critica, cveAutor } = req.body;
                // Verificar parametros
                if (titulo == null || anio == null || critica == null || cveAutor == null) {
                    return res.status(409).json({ message: "Los campos son requeridos" });
                }
                // Verificar longitud de caracteres
                if (titulo.length > 150) {
                    return res.status(500).json({ message: "La longitud maxima del usuario es de 150 caracteres" });
                }
                // Llamar objetos
                const user = {
                    titulo,
                    anio,
                    critica,
                    cveAutor
                };
                // Insercion de datos
                const result = yield usuarioDAO_1.dao.insert(user);
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = req.body;
                if (usuario.cveUsuario == null) {
                    return res.status(400).json({ meesage: "No se puede actualizar" });
                }
                const result = yield usuarioDAO_1.dao.update(usuario);
                if (result.affectedRows > 0) {
                    return res.json({ meesage: "Actualizado correctamente" });
                }
                else {
                    return res.status(400).json({ meesage: result.message });
                }
            }
            catch (ex) {
                res.status(500).json({ message: ex.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cveUsuario } = req.params;
                if (cveUsuario == null) {
                    return res.status(400).json({ message: "No se puede eliminar" });
                }
                const result = yield usuarioDAO_1.dao.delete(parseInt(cveUsuario));
                if (result.affectedRows > 0) {
                    res.json({ message: "Borrado exitosamente" });
                }
                else {
                    res.status(400).json({ message: result.message });
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
