const http = require('http');

//req = request -> petición de cliente
//res = response -> restpuesta del servidor
//cliente = navegador

const server = http.createServer((req,res)=>{
  console.log('Un cliente se ha conectado')
  res.end('La conexion ha sido correcta')
})

server.listen(3000,()=>{
  console.log('Servidor a la espera de conexiones')
})