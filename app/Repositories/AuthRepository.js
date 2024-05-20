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


    async login(username, password, res) {
        try {
            const query = `SELECT * FROM users WHERE username = ?`;
            const [rows] = await db.query(query, [username]);

            if (rows.length === 0) {
                //return res.status(401).send({ erro: 'Usuário não encontrado' });
                return res.render('index', { error: 'Usuário não encontrado' });
            }

            const user = rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.render('index', { error: 'Senha incorreta' });
            }

            //res.send({ mensagem: 'Login bem-sucedido' });
            res.redirect('/home');

        } catch (error) {
            console.error('Erro ao tentar realizar o login:', error);
            
            // Envie uma resposta de erro mais detalhada
            res.status(500).json({
                mensagem: 'Falha no login',
                erro: error.message || 'Erro interno do servidor'
            });
        }
    }
}

export default new AuthRepository();