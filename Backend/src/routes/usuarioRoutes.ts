import { Router } from 'express';
import {usuarioController} from '../controllers/usuarioController';

class UsuarioRoutes {
    public router: Router = Router();

    constructor() { 
        this.config();
    }

    config(): void {
        this.router.put('/', usuarioController.insert);
    }
}

const usuariosRoutes = new UsuarioRoutes();
export default usuariosRoutes.router;