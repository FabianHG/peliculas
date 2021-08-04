import pool from "../database/database";

class GeneralDao {

    public async razas() {
        const result = await pool.then(async (connection) => {
            return await connection.query("SELECT idRaza, nomRaza, descripcion FROM razas ORDER BY descripcion ASC")
        });

        return result;
    }

}
 export const dao = new GeneralDao();