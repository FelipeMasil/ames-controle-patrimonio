import AuthRepository from '../Repositories/AuthRepository.js'


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {

    static async registerUser(req, res) {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await AuthRepository.register(username, hashedPassword)
        res.send({ message: 'Usuário registrado com sucesso!' })
    }

    /*static async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            console.log(username, password);
            
            // Supondo que o método login retorne um objeto user
            const user = await AuthRepository.login(username, password);
    
            if (!user) return res.status(404).send('User not found');
    
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(403).send('Invalid credentials');
    
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.ACCESS_TOKEN_SECRET || 'defaultSecret', // use a default for development
                { expiresIn: '1h' }
            );
            res.json({ accessToken: token }).redirect('/home');
        } catch (error) {
            console.error('Erro ao fazer o login:', error);
            res.status(500).json({ message: 'Falha ao fazer o login' });
        }
    }*/
    static async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            console.log(username, password);
            
            const user = await AuthRepository.login(username, password);
    
            if (!user) return res.status(404).send('User not found');
    
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(403).send('Invalid credentials');
    
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.ACCESS_TOKEN_SECRET || 'defaultSecret',
                { expiresIn: '1h' }
            );
    
            // Envie o token como uma resposta JSON
            res.json({ accessToken: token });
        } catch (error) {
            console.error('Erro ao fazer o login:', error);
            res.status(500).json({ message: 'Falha ao fazer o login' });
        }
    }
    
    
}

export default AuthController;