import pool from "../database/database";

class PeliculaDAO {
    public async lista() {
        const result  = await pool.then(async (connection) => {
            return await connection.query("SELECT cvePelicula, titulo, anio, critica, cveAutor FROM pelicula order by cvePelicula ASC");
        });

        return result;
    }

    public async verificarUsuario(pelicula: string) {
        const result = await pool.then(async (connection) => {
            return await connection.query('SELECT cvePelicula FROM pelicula WHERE username = ?', [pelicula]);
        });

        return result;
    }

    public async verificarRol(cveRol: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query('SELECT * FROM rol WHERE cveRol = ? AND activo = ?', [cveRol, true]);
        });

        return result;
    }

    public async insert(pelicula: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query("INSERT INTO pelicula SET ?", [pelicula]);
        });
        return result;
        
    }
}

export const dao = new PeliculaDAO();