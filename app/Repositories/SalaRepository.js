import db from '../database/conn.js'

class SalaRepository{
    async findAll(){}

    async findById(){}

    async create(nome, andar) {
        try {
            console.log(nome, andar);

            const query = `
                INSERT INTO salas (NOME, ANDAR)
                VALUES (?, ?);
            `;

            const values = [nome, andar];
            const valuesUpperCase = values.map(value => value.toUpperCase())

            const [result] = await db.query(query, valuesUpperCase);
            return result;
        } catch (error) {
            console.error('Erro ao inserir na tabela salas:', error);
            throw new Error('Falha ao inserir dados no banco');
        }
    }
}

export default new SalaRepository();