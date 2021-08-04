import pool from "../database/database";

class PeliculaDao {
    public async lista() {
        const result  = await pool.then(async (connection) => {
            return await connection.query("SELECT cveUsuario, nombre, apellidos, username, cveMascota, nombreMascota, raza, idRaza, nomRaza, descripcion  FROM usuario JOIN mascota ON usuario.cveUsuario = mascota.cvePropietario JOIN razas ON mascota.raza = razas.idRaza ORDER BY usuario.nombre, usuario.apellidos ASC");
        });

        return result;
    }
}

export const dao = new PeliculaDao();