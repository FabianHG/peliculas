import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import secretKey from '../config/jwtKey';
import { dao } from '../dao/authDao';
import { utils } from '../utils/utils';

class AuthController {

    /**
    * Nombre: Login
    * Descripcion: metodo que comprueba los datos de acceso del usuario 
    */
    public async login(req: Request, res: Response){
        const { username, password, nombre, apellidos } = req.body;
        console.log(username, password);
        if(username == null || password == null){
            return res.status(400).json({message : "Usuario y contraseña  incorrecta"});
        }

        const users = await dao.getUser(username);

        // Verificar si existe el usuario
        if(users.length <= 0){
            return res.status(400).json({message : "El usuario no existe"});
        }

<<<<<<< HEAD
        for(let user of users) {
            if(await utils.checkPassword(password, user.password)){
                const token = jwt.sign({cveUsuario : user.cveUsuario, username}, secretKey.jwtSecret, {expiresIn : '1h'});
                return res.json({ message : "OK", token, cveUsuario : user.cveUsuario, username, nombre: user.nombre, apellidos: user.apellidos});
=======
        for(let peliculas of users) {
            if(await utils.checkPassword(password, users.password)){
                const token = jwt.sign({cveUsuario : users.cveUsuario, username, cveRol : users.cveRol, rol : users.clave}, secretKey.jwtSecret, {expiresIn : '1h'});
                return res.json({ message : "OK", token, cvePelicula : peliculas.cvePelicula, PeliculaRol : peliculas.titulo, anio: peliculas.anio, critica: peliculas.critica,pelicula: peliculas.cveAutor});
>>>>>>> dc2b6a1a46d2ac01d05ce20e0403b0df7365c638
            } else {
                return res.status(400).json({message : "La contraseña es incorrecta"});
            }
        }
    }

}

export const authController = new AuthController();