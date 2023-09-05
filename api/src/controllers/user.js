const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const data = req.body;
        const user = await prisma.user.create({
            data: data
        });

        // const findUser = await prisma.user.findUnique({
        //     where: { username }
        // });

        // const findEmail = await prisma.user.findUnique({
        //     where: { email }
        // });

        // if(findUser){
        //     return res.status(400).json({ error: 'Username já está sendo utilizado' });
        // }else if(findEmail){
        //     return res.status(400).json({ error: 'Email já está sendo utilizado' });
        // }else

        return res.status(201).json(user).end();
    

    } catch (error) {
        return res.status(206).json({ "msg": "Username ou Email já sendo utilizados" }).end();
    }
}


const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return res.status(206).json({ error: 'Usuário não encontrado' });
        }else if (user.password !== password) {
            return res.status(206).json({ error: 'Senha incorreta' });
        }else{
            return res.status(200).json(user);
        }

    } catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' }).end();
    }
}

module.exports = {
    create,
    login
};