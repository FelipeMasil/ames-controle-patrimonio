

import PCRepository from '../Repositories/PCRepository.js';

class PcController {

    async index(req, res) {
        try {
            const result = await PCRepository.findAll();
            res.json(result);
        } catch (error) {
            console.error('Erro', error);  // Adicionado para logar o erro no console do servidor
            res.status(500).json({ error: error.message });  // Melhorar a resposta de erro para o cliente
        }
    }

    async show(req, res) {
        try {
            const id = req.params.id;
            const result = await PCRepository.findById(id);
            res.json(result).status(200);
        } catch (error) {
            res.json(error)
        }
    }

    async store(req, res) {
        try {
            const { patrimonio, s_windows, mac, s_tag, marca, modelo, serial_placa } = req.body;
            
            // Add validation and sanitation here if needed
    
            await PCRepository.create(patrimonio, s_windows, mac, s_tag, marca, modelo, serial_placa);
    
            res.status(201).json({ message: 'Success' });
        } catch (error) {
            console.error('Error storing PC data:', error);
            
            // Send a more detailed error response
            res.status(500).json({
                message: 'Failed to store PC data',
                error: error.message || 'Internal Server Error'
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const { email, idade } = req.body
            await PCRepository.update(id, email, idade)
            res.json({ message: 'Success' })
        } catch (error) {
            res.status(204)
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            await PCRepository.delete(id);
            res.json({ message: 'Deleted' });
        } catch (error) {
            res.json(error)
        }
    }
}

export default new PcController();