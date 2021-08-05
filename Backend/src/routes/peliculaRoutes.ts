import { Router } from 'express';
import {peliculaController} from '../controllers/peliculaController';
import { checkJwt } from '../middleware/jwt';
import { checkRol } from '../middleware/roles';

class PeliculaRoutes {
    public router: Router = Router();

    constructor() { 
        this.config();
    }

    config(): void {
        this.router.get('/', [checkJwt, checkRol([1])], peliculaController.lista);
        this.router.put('/', [checkJwt, checkRol([1])], peliculaController.insert);
        this.router.post('/', [checkJwt, checkRol([1])], peliculaController.update);
        this.router.delete('/:cvePelicula', [checkJwt, checkRol([1])], peliculaController.delete)
    }
}

const peliculasRoutes = new PeliculaRoutes();
export default peliculasRoutes.router;