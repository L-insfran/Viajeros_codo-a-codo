const provinciaController = {};
const conexion = require('../database/connection.js');

provinciaController.index = async (req, res) => {
  try {
    const query = 'SELECT * FROM provincia';
    const [rows] = await conexion.query(query);

    res.status(200).json(rows); // Devuelve todos los usuarios en formato JSON
  } catch (err) {
    console.error('ERROR_PROVINCIA-CONTROLLER.INDEX', err);
    res.status(500).send('Se ha generado un error al obtener las provincias');
  }
}
provinciaController.store = async (req, res) => {

  const {nombre_provincia} = req.body;

   // Validar que todos los campos estén presentes
  if (!nombre_provincia) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const query = `
      INSERT INTO provincia (nombre_provincia) 
      VALUES (?)
    `;
    const values = [nombre_provincia];

    const [result] =  await conexion.query(query, values);

    const response = {
      message: 'Provincia creada con éxito',
      provincia: {
        id: result.insertId,
        nombre:nombre_provincia
      }
    };

    res.status(200).json(response); // Envía los datos como Jsom
  } catch (err) {
    console.error('ERROR_PROVINCIA-CONTROLLER.STORE',err);
    res.status(500).send('Se ha generado un error al cargar la provincia');
  }
}

provinciaController.show = async (req, res) => {
  const { id_provincia } = req.params;

  // Validar que el id_provincia esté presente
  if (!id_provincia) {
    return res.status(400).json({ error: 'El id_provincia es obligatorio.' });
  }

  try {
    const query = `
      SELECT * FROM provincia 
      WHERE id_provincia = ?
    `;
    const values = [id_provincia];

    const [result] = await conexion.query(query, values);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Provincia no encontrada.' });
    }

    res.status(200).json(result[0]); // Envía los datos del usuario como JSON
  } catch (err) {
    console.error('ERROR_PROVINCIA-CONTROLLER.SHOW', err);
    res.status(500).send('Se ha generado un error al seleccionar la provincia');
  }
}

provinciaController.update = async (req, res) => {
  const { id_provincia } = req.params;
  const { nombre_provincia} = req.body;

   // Validar que todos los campos estén presentes
  if (!nombre_provincia ) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Validar que el id_provincia esté presente
  if (!id_provincia) {
    return res.status(400).json({ error: 'El id_provincia es obligatorio.' });
  }

  // Validar que al menos un campo esté presente para actualizar
  if (!nombre_provincia) {
    return res.status(400).json({ error: 'Al menos un campo debe estar presente para actualizar.' });
  }

  try {
    const updateQuery = `
      UPDATE provincia 
      SET 
        nombre_provincia = COALESCE(?, nombre_provincia)
      WHERE id_provincia = ?
    `;
    const updateValues = [nombre_provincia, id_provincia];

    const [result] = await conexion.query(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Provincia no encontrada.' });
    }

    // Recuperar la información actualizada de la provincia
    const selectQuery = `
      SELECT * FROM provincia 
      WHERE id_provincia = ?
    `;
    const [selectResult] = await conexion.query(selectQuery, [id_provincia]);

    res.status(200).json({ message: 'Provincia actualizada con éxito', ProvinciaActualizada: selectResult[0] });
  } catch (err) {
    console.error('ERROR_PROVINCIA-CONTROLLER.UPDATE', err);
    res.status(500).send('Se ha generado un error al actualizar la provincia');
  }
}

provinciaController.delete = async (req, res) => {
  const { id_provincia } = req.params;

  // Validar que el id_usuario esté presente
  if (!id_provincia) {
    return res.status(400).json({ error: 'El id_usuario es obligatorio.' });
  }

  try {
    // Primero, recuperar la información la provincia
    const selectQuery = `
      SELECT * FROM provincia 
      WHERE id_provincia = ?
    `;
    const selectValues = [id_provincia];
    const [selectResult] = await conexion.query(selectQuery, selectValues);

    if (selectResult.length === 0) {
      return res.status(404).json({ error: 'Provincia no encontrada.' });
    }

    const provinciaEliminada = selectResult[0];

    // Luego, eliminar el usuario
    const deleteQuery = `
      DELETE FROM provincia 
      WHERE id_provincia = ?
    `;
    const deleteValues = [id_provincia];
    const [deleteResult] = await conexion.query(deleteQuery, deleteValues);

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Provincia no encontrada.' });
    }

    res.status(200).json({ message: 'Provincia eliminada con éxito', provinciaEliminada }); // Envía los datos del usuario eliminado como JSON
  } catch (err) {
    console.error('ERROR_PROVINCIA-CONTROLLER.DELETE',err);
    res.status(500).send('Se ha generado un error al eliminar la provincia');
  }
}

module.exports = provinciaController