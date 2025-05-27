import express from 'express'    
import rotaspublicas from './Rotas/publico.js'

const app = express()
app.use(express.json())

app.use('/usuarios', rotaspublicas)

app.listen(3000, () => console.log("Servidor Online"))