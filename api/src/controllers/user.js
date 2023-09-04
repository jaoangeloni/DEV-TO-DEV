const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const data = req.body;
        const user = await prisma.user.create({
            data: data
        });
        return res.status(201).json(user).end();
    } catch (error) {
        res.status(206).json({ "msg": "Username ou Email já sendo utilizados" }).end();
    }
}

// const create = async (req, res) => {
//     try {
//         const data = req.body;
//         const user = await prisma.user.create({
//             data: data
//         });
//         return res.status(201).json(user).end();
//     } catch (error) {
//         res.status(400).json({ error: error.message }).end();
//     }
// }

module.exports = {
    create
};