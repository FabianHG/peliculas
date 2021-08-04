import { Request, Response } from 'express';
import { dao } from '../dao/peliculasDao';

class PeliculasController {
    public async lista(req: Request, res: Response) {
        try {
            const result = await dao.lista();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const peliculaController = new PeliculasController();