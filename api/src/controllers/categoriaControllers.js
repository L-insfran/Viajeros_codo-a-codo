const categoriaController = {}
const conexion = require('../database/connection.js');

categoriaController.index = async (req, res) => {
  try {
    const query = 'SELECT * FROM categorias';
    const [rows] = await conexion.query(query);

    res.status(200).json(rows); // Devuelve todos los usuarios en formato JSON
  } catch (err) {
    console.error('ERROR_CATEGORIA-CONTROLLER.INDEX', err);
    res.status(500).send('Se ha generado un error al obtener las categorias');
  }
}

categoriaController.store = async (req, res) => {

  const {nombre_categoria} = req.body;

   // Validar que todos los campos estén presentes
  if (!nombre_categoria) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const query = `
      INSERT INTO categorias (nombre_categoria) 
      VALUES (?)
    `;
    const values = [nombre_categoria];

    const [result] =  await conexion.query(query, values);

    const response = {
      message: 'Categoría creada con éxito',
      categoria: {
        id: result.insertId,
        nombre:nombre_categoria
      }
    };

    res.status(200).json(response); // Envía los datos como Jsom
  } catch (err) {
    console.error('ERROR_CATEGORIA-CONTROLLER.STORE',err);
    res.status(500).send('Se ha generado un error al cargar la categoria');
  }
}

categoriaController.show = async (req, res) => {
  const { id_categoria } = req.params;

  // Validar que el id_provincia esté presente
  if (!id_categoria) {
    return res.status(400).json({ error: 'El id_categoria es obligatorio.' });
  }

  try {
    const query = `
      SELECT * FROM categorias 
      WHERE id_categoria = ?
    `;
    const values = [id_categoria];

    const [result] = await conexion.query(query, values);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada.' });
    }

    res.status(200).json(result[0]); // Envía los datos del usuario como JSON
  } catch (err) {
    console.error('ERROR_CATEGORIA-CONTROLLER.SHOW', err);
    res.status(500).send('Se ha generado un error al seleccionar la categoria');
  }
}

categoriaController.update = async (req, res) => {
  const { id_categoria } = req.params;
  const { nombre_categoria} = req.body;

   // Validar que todos los campos estén presentes
  if (!nombre_categoria) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Validar que el id_provincia esté presente
  if (!id_categoria) {
    return res.status(400).json({ error: 'El id_categoria es obligatorio.' });
  }


  try {
    const updateQuery = `
      UPDATE categorias 
      SET 
        nombre_categoria = COALESCE(?, nombre_categoria)
      WHERE id_categoria = ?
    `;
    const updateValues = [nombre_categoria, id_categoria];

    const [result] = await conexion.query(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Categoria no encontrada.' });
    }

    // Recuperar la información actualizada de la categoria
    const selectQuery = `
      SELECT * FROM categorias
      WHERE id_categoria = ?
    `;
    const [selectResult] = await conexion.query(selectQuery, [id_categoria]);

    res.status(200).json({ message: 'Categoria actualizada con éxito', categoriaActualizada: selectResult[0] });
  } catch (err) {
    console.error('ERROR_CATEGORIA-CONTROLLER.UPDATE', err);
    res.status(500).send('Se ha generado un error al actualizar la categoria');
  }
}

categoriaController.delete = async (req, res) => {
  const { id_categoria } = req.params;

  // Validar que el id_categoria esté presente
  if (!id_categoria) {
    return res.status(400).json({ error: 'El id_categoria es obligatorio.' });
  }

  try {
    // Primero, recuperar la información la categoria
    const selectQuery = `
      SELECT * FROM categorias 
      WHERE id_categoria = ?
    `;
    const selectValues = [id_categoria];
    const [selectResult] = await conexion.query(selectQuery, selectValues);

    if (selectResult.length === 0) {
      return res.status(404).json({ error: 'Categoria no encontrada.' });
    }

    const categoriaEliminada = selectResult[0];

    // Luego, eliminar el usuario
    const deleteQuery = `
      DELETE FROM categorias
      WHERE id_categoria = ?
    `;
    const deleteValues = [id_categoria];
    const [deleteResult] = await conexion.query(deleteQuery, deleteValues);

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Categoria no encontrada.' });
    }

    res.status(200).json({ message: 'Categoria eliminada con éxito', categoriaEliminada }); // Envía los datos del usuario eliminado como JSON
  } catch (err) {
    console.error('ERROR_CATEGORIA-CONTROLLER.DELETE',err);
    res.status(500).send('Se ha generado un error al eliminar la categoria');
  }
}


module.exports = categoriaController