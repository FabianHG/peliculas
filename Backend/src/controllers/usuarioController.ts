import { Request, Response } from 'express';
import { dao } from '../dao/usuarioDAO';
import { utils } from '../utils/utils';

class UsuarioController {
    /**
     *  Nombre: lista
     *  Descripcion: lista de usuarios de la base de datos
     *  Resultado: json con informacion de  usuarios registrados.
     */
    public async lista(req: Request, res: Response) {
        try {
            const result = await dao.lista();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     *  Nombre: insert
     *  Descripcion: insertar datos de un nuevo usuario
     *  Resultado: json con mensaje.
     */
    public async insert(req: Request, res: Response) {
        try {
            const { titulo,anio,critica,cveAutor } = req.body;

            // Verificar parametros
            if (titulo == null || anio == null || critica == null || cveAutor == null) {
                return res.status(409).json({ message: "Los campos son requeridos" });
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
            const { cvePelicula } = req.params;

            if(cvePelicula == null){
                return res.status(400).json({ message : "No se puede eliminar" });
            }

            const result = await dao.delete(parseInt(cvePelicula));

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