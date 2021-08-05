"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const peliculaController_1 = require("../controllers/peliculaController");
const jwt_1 = require("../middleware/jwt");
const roles_1 = require("../middleware/roles");
class PeliculaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', [jwt_1.checkJwt, roles_1.checkRol([1])], peliculaController_1.peliculaController.lista);
        this.router.put('/', [jwt_1.checkJwt, roles_1.checkRol([1])], peliculaController_1.peliculaController.insert);
        this.router.post('/', [jwt_1.checkJwt, roles_1.checkRol([1])], peliculaController_1.peliculaController.update);
        this.router.delete('/:cvePelicula', [jwt_1.checkJwt, roles_1.checkRol([1])], peliculaController_1.peliculaController.delete);
    }
}
const peliculasRoutes = new PeliculaRoutes();
exports.default = peliculasRoutes.router;
