"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
// import { checkJwt } from '../middleware/jwt';
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.put('/', /*[checkJwt],*/ usuarioController_1.usuarioController.insert);
    }
}
const usuariosRoutes = new UsuarioRoutes();
exports.default = usuariosRoutes.router;
