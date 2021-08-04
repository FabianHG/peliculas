import { Router } from 'express';
import { peliculaController } from "../controllers/peliculasController";
import { checkJwt } from '../middlewares/jwt';

class PeliculasRoutes {

    public router: Router = Router();

    constructor() { 
        this.config();
    }

    config(): void {
        this.router.get('/', /*[checkJwt],*/ peliculaController.lista);
    }

}

const peliculaRoutes = new PeliculasRoutes();
export default peliculaRoutes.router;