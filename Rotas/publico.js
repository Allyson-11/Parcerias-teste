import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient()

const rota = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

rota.post('/cadastro-usuario', async (req, res) => {
    try {
        const user = req.body

        const salt = await bcrypt.genSalt(10)
        const hashsenha = await bcrypt.hash(user.senha, salt)


        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                senha: hashsenha,
                cpf: user.cpf,

            },

        })

        res.status(201).json(userDB)

    } catch (err) {
        res.status(500).json({ message: 'Erro ao conectar com o servidor, tente novamente' })
    }
})

rota.post('/login', async (req, res) => {

    try {
        const userInfo = req.body

        const user = await prisma.user.findUnique({
            where: { cpf: userInfo.cpf },
        })


        if (!user) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }

        const isMatch = await bcrypt.compare(userInfo.senha, user.senha)

        if (!isMatch) {
            return res.status(400).json({ message: 'Senha invalida' })
        }


        const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json(token)


    } catch (err) {
        res.status(500).json({ message: 'Erro ao conectar com o servidor, tente novamente' })
    }



})

export default rota