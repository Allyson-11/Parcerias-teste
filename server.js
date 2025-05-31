import express from 'express'
import rotaspublicas from './Rotas/publico.js'
import rotasprivadas from './Rotas/privado.js'
import rotasParcerias from './Rotas/parcerias.js'
import auth from './middlewares/auth.js'

const app = express()
app.use(express.json())

app.use('/usuarios', rotaspublicas)
app.use('/usuarios', auth, rotasprivadas)
app.use('/usuarios', rotasParcerias)

app.listen(3000, () => console.log("Servidor Online"))