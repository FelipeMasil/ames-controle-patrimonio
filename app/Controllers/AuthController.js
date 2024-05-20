import AuthRepository from '../Repositories/AuthRepository.js'
import bcrypt from 'bcryptjs'

class AuthController {

    registerUser = async (req, res) => {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await AuthRepository.register(username, hashedPassword)
            res.send({ message: 'Usuário registrado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro ao registrar usuário' });
        }
    };

    loginUser = async (req, res) => {
        try {
            const { username, password } = req.body;
            console.log(username, password)
            await AuthRepository.login(username, password, res);
        } catch (error) {
            console.error('Erro ao fazer o login:', error);
            res.status(500).json({ message: 'Falha ao fazer o login' });
        }
    }

}

export default new AuthController()