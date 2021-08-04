"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const peliculasController_1 = require("../controllers/peliculasController");
class PeliculasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', /*[checkJwt],*/ peliculasController_1.peliculaController.lista);
    }
}
const peliculaRoutes = new PeliculasRoutes();
exports.default = peliculaRoutes.router;
