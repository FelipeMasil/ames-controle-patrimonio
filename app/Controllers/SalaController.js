import SalaRepository from '../Repositories/SalaRepository.js'

class SalaController {

    async store(req, res) {
        try {
            const { nome, andar } = req.body;
            
            // Add validation and sanitation here if needed
    
            await SalaRepository.create(nome, andar);
    
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

}

export default new SalaController();