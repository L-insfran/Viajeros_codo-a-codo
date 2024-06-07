
const express = require('express')
const path = require('path')
const routes = require('./src/routes/index.routes')

const app = express()


app.use(routes)

//Static Files
app.use(express.static(path.join(__dirname,'./public')))

app.use((req, res)=>{
  res.sendFile(path.join(__dirname,'./public/404.html'))
})
const PORT = process.env.PORT || 3333

app.listen(PORT, ()=> {
  console.log('Servidor escuchando en el Puerto:' + PORT)
})