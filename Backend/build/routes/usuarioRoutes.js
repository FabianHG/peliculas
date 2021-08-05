"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const jwt_1 = require("../middleware/jwt");
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.put('/', usuarioController_1.usuarioController.insert);
        this.router.get('/', [jwt_1.checkJwt], usuarioController_1.usuarioController.lista);
        this.router.put('/', [jwt_1.checkJwt], usuarioController_1.usuarioController.insertp);
        this.router.post('/', [jwt_1.checkJwt], usuarioController_1.usuarioController.update);
        this.router.delete('/:cvePelicula', [jwt_1.checkJwt], usuarioController_1.usuarioController.delete);
    }
}
const usuariosRoutes = new UsuarioRoutes();
exports.default = usuariosRoutes.router;
