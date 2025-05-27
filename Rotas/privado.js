import express from 'express'  

const rota = express.Router()

rota.post('/cadastro-usuario', (req, res) => {
    const user = req.body

    res.status(201).json(user)


})

export default rota