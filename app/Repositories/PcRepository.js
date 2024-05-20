import db from '../database/conn.js'

class PcRepository {

    async findAll() {
        try {
            const query = `
            SELECT 
                PCS.PATRIMONIO,
                PCS.S_WINDOWS AS SERIAL,
                PCS.MAC_ADDRESS AS MAC,
                PCS.S_TAG,
                PCS.SERIAL_PLACA,
                SALAS.NOME AS SALA,
                SALAS.ANDAR AS ANDAR
            FROM 
                PCS
            JOIN 
                SALA_PC ON PCS.PATRIMONIO = SALA_PC.PATRIMONIO
            JOIN 
                SALAS ON SALA_PC.SALA_ID = SALAS.ID;
            `;
    
            const [result] = await db.query(query);
            return result;
        } catch (error) {
            console.error('Erro', error);
            throw new Error(error);
        }
    }

    async findById(id) {
        try {
            const query = `
            SELECT 
                PCS.PATRIMONIO,
                PCS.S_WINDOWS AS SERIAL,
                PCS.MAC_ADDRESS AS MAC,
                PCS.S_TAG,
                PCS.SERIAL_PLACA,
                SALAS.NOME AS SALA,
                SALAS.ANDAR AS ANDAR
            FROM 
                PCS
            JOIN 
                SALA_PC ON PCS.PATRIMONIO = SALA_PC.PATRIMONIO
            JOIN 
                SALAS ON SALA_PC.SALA_ID = SALAS.ID
            WHERE PCS.PATRIMONIO = ?;
            `

            const [result] = await db.query(query, id)
            return result;
        } catch (error) {
            console.error('Erro', error);
            throw new Error(error);
        }
    }

    async create(patrimonio, s_windows, mac, s_tag, marca, modelo, serial_placa) {
        try {

            const query = `
                INSERT INTO pcs (PATRIMONIO, S_WINDOWS, MAC_ADDRESS, S_TAG, MARCA, MODELO, SERIAL_PLACA)
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `;

            const values = [patrimonio, s_windows, mac, s_tag, marca, modelo, serial_placa];

            const [result] = await db.query(query, values);
            return result;
        } catch (error) {
            console.error('Error inserting data into pcs:', error);
            throw new Error('Database insertion failed');
        }
    }

    async update(id, email, idade) {
        try {
            const sql = `UPDATE USUARIOS SET EMAIL = '${email.toUpperCase()}', IDADE = '${idade}' WHERE ID = ${id}`
            const result = await db.query(sql)
            return result
        } catch (error) {
            return error
        }
    }

    async delete(id) {
        try {
            const sql = `DELETE FROM USUARIOS WHERE ID = ${id}`
            const result = await db.query(sql);
            return result
        } catch (error) {
            return error
        }
    }
}

export default new PcRepository();