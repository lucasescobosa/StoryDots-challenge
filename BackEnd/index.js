const express = require('express')
const morgan = require ('morgan')
const cors = require ('cors')
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3001
process.env.NODE_ENV !== "prod" && app.use(morgan("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: 'GET, PUT, POST, DELETE'
}))

app.get('/', (req, res) => {
  res.send('Servidor funcionando!')
})

const usersRouter = require ('./routes/usersRouter')
app.use('/login', usersRouter)
const productsRouter = require ('./routes/productsRouter')
app.use('/products', productsRouter)

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`)
})