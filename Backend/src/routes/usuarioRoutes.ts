import { Router } from 'express';
import {usuarioController} from '../controllers/usuarioController';
import { checkJwt } from '../middleware/jwt';


class UsuarioRoutes {
    public router: Router = Router();

    constructor() { 
        this.config();
    }

    config(): void {
        this.router.put('/', usuarioController.insert);
        this.router.get('/', [checkJwt ], usuarioController.lista);
        this.router.put('/', [checkJwt], usuarioController.insertp);
        this.router.post('/', [checkJwt], usuarioController.update);
        this.router.delete('/:cvePelicula', [checkJwt],  usuarioController.delete);
    }
}

const usuariosRoutes = new UsuarioRoutes();
export default usuariosRoutes.router;