import pool from "../database/database";

class UsuarioDAO {
    public async lista() {
        const result  = await pool.then(async (connection) => {
            return await connection.query("SELECT cvePelicula,titulo,anio,critica,cveAutor FROM pelicula ORDER BY titulo ASC");
        });

        return result;
    }



    public async insert(user: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query("INSERT INTO pelicula SET ?", [user]);
        });
        return result;
        
    }

    public async update(user: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query("UPDATE pelicula SET ? WHERE cvePelicula = ?", [user, user.cvePelicula]);
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