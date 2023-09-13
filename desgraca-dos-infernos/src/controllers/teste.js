const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const imagem = document.getElementById("imagem");

const teste = async (req, res) => {
    const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        const image = user.picture
        const base = Buffer.from(image).toString('base64');
        const url = `data:image/jpg;base64,${base}`;
        // imagem.src = url
        return res.json(url)
}

module.exports = {
    teste
};