import jwt from 'jsonwebtoken'
import express from 'express'

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) => {


    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ massage: 'Acesso negado, verifique as informações' })
    }

    try {

        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)

        req.userId = decoded.id


    } catch (err) {
        return res.status(401).json({ massage: 'acesso não autorizado devido a token invalido' })
    }



    next()
}

export default auth