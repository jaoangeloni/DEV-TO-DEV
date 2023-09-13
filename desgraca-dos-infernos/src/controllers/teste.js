const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const teste = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(req.params.id) }
    });
    const image = user.picture
    const base = Buffer.from(image).toString('base64');
    const url = `data:image/png;base64,${base}`;
    return res.status(200).json(url)
}

module.exports = {
    teste
};