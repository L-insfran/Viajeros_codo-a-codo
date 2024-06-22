const destinoCategoriaController = {}
const conexion = require('../database/connection.js');

destinoCategoriaController.store = async (req, res) =>{
  
  const { id_destino, id_categoria } = req.body;

   // Validar que todos los campos estén presentes
  if (!id_destino || !id_categoria) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {

    const query =`
      INSERT INTO Destinos_Categorias (id_destino, id_categoria) VALUES (?,?)
    `;
    const values = [id_destino, id_categoria]

    const [result] = await conexion.query(query, values);

    const response = {
      message: 'Categoria asignada con exito a Destino',
      categoria_destino: {
        id_categoria,
        id_destino
      }
    }

    res.status(200).json(response);
    
  } catch (err) {
    console.error('ERROR_DESTINO-CATEGORIA-CONTROLLER.STORE',err);
    res.status(500).send('Se ha generado un error al Asignar la categoria al destino');
  }

}


module.exports = destinoCategoriaController