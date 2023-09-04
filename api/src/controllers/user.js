const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const data = req.body;
        const cliente = await prisma.cliente.create({
            data: data
        });
        return res.status(201).json(cliente).end();
    } catch (error) {
        res.status(400).json({ error: error.message }).end();
    }
}
