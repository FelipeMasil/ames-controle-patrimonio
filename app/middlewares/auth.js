import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    //Proibido se o token não for encontrado
    if (!token) return res.sendStatus(403);

    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'defaultKey', (err, user) => {
        if (err) return res.sendStatus(403);//Proibido se o token for invalido
        req.user = user;
        next(); //Prossegue se tudo correto
    });
};

export default authenticateToken;
