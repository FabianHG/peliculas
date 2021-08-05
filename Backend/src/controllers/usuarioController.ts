import { Request, Response } from 'express';
import { dao } from '../dao/usuarioDAO';
import { utils } from '../utils/utils';

class UsuarioController {

    public async insert(req: Request, res: Response) {
        try {
            const {nombre, apellidos, username, password } = req.body;

            // Verificar parametros
            if (username == null || password == null) {
                return res.status(409).json({ message: "Los campos son requeridos" });
            }

            // Verificar longitud de caracteres
            if(username.length > 350){
                return res.status(500).json({message : "La longitud maxima del usuario es de 350 caracteres"});
            }

            // Verificar nombre de usuario
            const verify = await dao.verificarUsuario(username);
            if(verify.length > 0){
                return res.status(500).json({message : "El usuario ya existe"});
            }

            // Encriptar contraseña
            const encryptedPassword = await utils.hashPassword(password);

            // Llamar objetos
            const user = {
                nombre,
                apellidos,
                username,
                password: encryptedPassword
            }

            // Insercion de datos
            const result = await dao.insert(user);

            if (result.affectedRows > 0) {
                return res.json({ message: "Los datos han sido guardados" });
            } else {
                return res.status(409).json({ message: result.message });
            }
            res.json(result);
        } catch (ex) {
            res.status(500).json({ message: ex.message });
        }
    }

    public async lista(req: Request, res: Response) {
        try {
            const result = await dao.lista();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    public async insertp(req: Request, res: Response) {
        try {
            const { titulo,anio,critica,cveAutor } = req.body;

            // Verificar parametros
            if (titulo == null || anio == null || critica == null || cveAutor == null) {
                return res.status(409).json({ message: "Los campos son requeridos" });
            }

            // Verificar longitud de caracteres
            if(titulo.length > 150){
                return res.status(500).json({message : "La longitud maxima del usuario es de 150 caracteres"});
            }

            // Llamar objetos
            const user = {
                titulo,
                anio,
                critica,
                cveAutor
            }

            // Insercion de datos
            const result = await dao.insert(user);

            if (result.affectedRows > 0) {
                return res.json({ message: "Datos guardados exitosamente" });
            } else {
                return res.status(409).json({ message: result.message });
            }
            res.json(result);
        } catch (ex) {
            res.status(500).json({ message: ex.message });
        }
    }

    public async update (req:  Request, res: Response){
        try {
            const usuario = req.body;

            if(usuario.cveUsuario == null){
                return res.status(400).json({ meesage : "No se puede actualizar" });
            }

            const result = await dao.update(usuario);

            if(result.affectedRows > 0){
                return res.json({ meesage : "Actualizado correctamente" });
            } else  {
                return res.status(400).json({ meesage : result.message });
            }

        } catch (ex) {
            res.status(500).json({ message: ex.message });
        }
    }

    public async delete(req: Request, res: Response){
        try {
            const { cveUsuario } = req.params;

            if(cveUsuario == null){
                return res.status(400).json({ message : "No se puede eliminar" });
            }

            const result = await dao.delete(parseInt(cveUsuario));

            if(result.affectedRows > 0){
                res.json({ message : "Borrado exitosamente" })
            } else  {
                res.status(400).json({ message : result.message });
            }
        } catch (error) {
            res.status(400).json({ message : error.message });
        }
    }
}

export const usuarioController = new UsuarioController();