import express from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient()

const rota = express.Router()

rota.post('/cadastro-usuario', async (req, res) => {
    try{
    const user = req.body

    const salt = await bcrypt.genSalt(10)
    const  hashsenha = await bcrypt.hash(user.senha, salt)
    

    const userDB = await prisma.user.create({
        data: {
            email: user.email,
            name:  user.name,
            senha : hashsenha, 
        
        },
        
    })

    res.status(201).json(userDB)

    } catch (err) {
        res.status(500).json({ menssage: 'Erro ao conectar com o servidor, tente novamente' })
    } 
})

export default rota