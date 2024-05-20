import db from '../database/conn.js';

import bcrypt from 'bcryptjs'

class AuthRepository {

    async register(username, password) {
        try{
            const query = `
            INSERT INTO users (username, password) VALUES (?, ?);
            `
            const values = [username, password]

            const [result] = await db.query(query, values);
            return result
        }catch{
            console.error('Error inserting data into pcs:', error);
            throw new Error('Database insertion failed');
        }
    }




    async login(username, password) {
        try {
            const query = `SELECT * FROM users WHERE username = ?`;
            const [rows] = await db.query(query, [username]);
    
            if (rows.length === 0) {
                return null; // Usuário não encontrado
            }
    
            const user = rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
    
            if (!passwordMatch) {
                return null; // Senha incorreta
            }
    
            return user; // Retorne o objeto user
        } catch (error) {
            console.error('Erro ao tentar realizar o login:', error);
            throw new Error('Erro interno do servidor'); // Lance um erro que pode ser tratado pelo controlador
        }
    }
    
}

export default new AuthRepository();