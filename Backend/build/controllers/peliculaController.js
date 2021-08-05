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
exports.peliculaController = void 0;
const peliculaDAO_1 = require("../dao/peliculaDAO");
class PeliculaController {
    /**
     *  Nombre: lista
     *  Descripcion: lista de usuarios de la base de datos
     *  Resultado: json con informacion de  usuarios registrados.
     */
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield peliculaDAO_1.dao.lista();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    /**
     *  Nombre: insert
     *  Descripcion: insertar datos de un nuevo usuario
     *  Resultado: json con mensaje.
     */
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { titulo, anio, critica, } = req.body;
                // Verificar parametros
                if (titulo == null || anio == null || critica == null) {
                    return res.status(409).json({ message: "Los campos son requeridos" });
                }
                // Verificar longitud de caracteres
                if (titulo.length > 150) {
                    return res.status(500).json({ message: "La longitud maxima del titulo es de 150 caracteres" });
                }
                // Verificar nombre de usuario
                const verify = yield peliculaDAO_1.dao.verificartitulo(titulo);
                if (verify.length > 0) {
                    return res.status(500).json({ message: "La pelicula ya existe" });
                }
                // Verificar Año
                const verifyAño = yield peliculaDAO_1.dao.verificarAño(anio);
                if (verifyAño.length <= 0) {
                    return res.status(500).json({ message: "El Año no existe o no esta disponible" });
                }
                // Llamar objetos
                const pelicula = {
                    titulo,
                    anio,
                    critica,
                };
                // Insercion de datos
                const result = yield peliculaDAO_1.dao.insert(pelicula);
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
                const pelicula = req.body;
                if (pelicula.cvePelicula == null) {
                    return res.status(400).json({ meesage: "No se puede actualizar" });
                }
                const result = yield peliculaDAO_1.dao.update(pelicula);
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
                const { cvePelicula } = req.params;
                if (cvePelicula == null) {
                    return res.status(400).json({ message: "No se puede eliminar" });
                }
                const result = yield peliculaDAO_1.dao.delete(parseInt(cvePelicula));
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
exports.peliculaController = new PeliculaController();
