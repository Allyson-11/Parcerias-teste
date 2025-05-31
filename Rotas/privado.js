import express from 'express'

import { PrismaClient } from '../generated/prisma/index.js';

const rota = express.Router()

const prisma = new PrismaClient()


rota.get('/listar-usuarios', async (req, res) => {

    try {

        const users = await prisma.user.findMany()

        const usersSemSenha = users.map(({ senha, ...rest }) => rest)

        res.status(200).json({ message: 'Usuários listados', users: usersSemSenha })

    } catch (err) {
        res.status(500).json({ message: 'Falha no servidor' })
    }
})

export default rota