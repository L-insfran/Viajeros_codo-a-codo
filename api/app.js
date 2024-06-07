require('dotenv').config()
const express = require('express')
const path = require('path')
const routes = require('./src/routes/routes')

const app = express()


app.use(routes)
/* En caso de no encontrar la ruta envia una pagina 404 */
//Static Files
app.use(express.static(path.join(__dirname,'./public')))

app.use((req, res)=>{
  res.sendFile(path.join(__dirname,'./public/404.html'))
})
const PORT = process.env.PORT || 3333

app.listen(PORT, ()=> {
  console.log('Servidor escuchando en el Puerto:' + PORT)
})