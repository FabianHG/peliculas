import { NextFunction, Request, Response } from "express";
import { dao } from '../dao/authDao';

export const checkRol = (roles: Array<Number>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { cvePelicula } = res.locals.jwtPayLoad;

            const lstPeliculas = await dao.getUserById(cvePelicula);
            for (let peliculas of lstPeliculas) {
                if(roles.includes(peliculas.cveRol)){
                    next();
                } else {
                    res.status(404).json({ message: "No autorizado" });
                }
            }
        } catch (error) {
            res.status(404).json({ message: "No autorizado" });
        }
    }
}
