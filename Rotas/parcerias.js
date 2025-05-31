import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();
const rota = express.Router();

rota.post('/parcerias', async (req, res) => {
    try {
        const { nome, descricao } = req.body;
        const novaParceria = await prisma.parceria.create({
            data: { nome, descricao },
        });
        res.status(201).json(novaParceria);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar parceria' });
    }
});

rota.get('/parcerias', async (req, res) => {
    try {
        const parcerias = await prisma.parceria.findMany();
        res.status(200).json(parcerias);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar parcerias' });
    }
});

rota.delete('/parcerias/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.parceria.delete({ where: { id } });
        res.status(200).json({ message: 'Parceria removida com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao remover parceria' });
    }
});

export default rota;
