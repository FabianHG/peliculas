"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// routes
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const peliculasRoutes_1 = __importDefault(require("./routes/peliculasRoutes"));
const generalRoutes_1 = __importDefault(require("./routes/generalRoutes"));
class Server {
    // Constructor de nuestro servidor
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    // Configuración del servidor
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    // Rutas para mi APIRest
    routes() {
        this.app.use('/usuario', usuarioRoutes_1.default);
        this.app.use('/auth', authRoutes_1.default);
        this.app.use('/pelicula', peliculasRoutes_1.default);
        this.app.use('/general', generalRoutes_1.default);
    }
    // Inicialización del servidor
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
