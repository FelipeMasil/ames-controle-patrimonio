import { Router } from 'express';
import PcController from '../app/Controllers/PcController.js'
import SalaController from '../app/Controllers/SalaController.js'
import AuthController from '../app/Controllers/AuthController.js'


const routes = Router();

/**Rota de Views */
routes.get('/', (req, res) => res.render('index.ejs'))

/** Rotas de usuarios */
routes.post('/registrarUsuario', AuthController.registerUser)
routes.post('/loginUsuario', AuthController.loginUser)

/** Rotas de login */
routes.get('/home', (req, res) => res.render('home'))

/** Rotas de PCS */
routes.get('/pcs', PcController.index)
routes.get('/pcs/:id', PcController.show) /*Busca por número de patrimonio*/ 
routes.post('/pcs', PcController.store)
routes.put('/pcs/update/:id', PcController.update)
routes.delete('/pcs/delete/:id', PcController.delete)

/** Rotas de salas */
routes.post('/salas', SalaController.store)




export default routes;