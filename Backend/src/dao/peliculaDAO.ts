import pool from "../database/database";

class UsuarioDAO {
    public async lista() {
        const result  = await pool.then(async (connection) => {
            return await connection.query("SELECT cvePelicula,titulo,anio,critica,cveUsuario FROM pelicula ORDER BY cvePelicula ASC");
        });

        return result;
    }

    public async verificartitulo(titulo: string) {
        const result = await pool.then(async (connection) => {
            return await connection.query('SELECT cvePelicula FROM pelicula WHERE titulo = ?', [titulo]);
        });

        return result;
    }

    public async verificarAño(Año: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query('SELECT * FROM pelicula WHERE Año = ? AND activo = ?', [Año, true]);
        });

        return result;
    }

    public async insert(pelicula: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query("INSERT INTO pelicula SET ?", [pelicula]);
        });
        return result;
        
    }

    public async update(pelicula: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query("UPDATE pelicula SET ? WHERE cvePelicula = ?", [pelicula, pelicula.cvePelicula]);
        });

        return result;

    }

    public async delete(cvePelicula: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query("DELETE FROM pelicula WHERE cvePelicula = ?", [cvePelicula]);
        });

        return result;

    }
}

export const dao = new UsuarioDAO();