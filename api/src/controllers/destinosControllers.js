const destinoController = {}
const conexion = require('../database/connection.js');

// destinoController.index = async (req, res) => {
//   try {
//     const query = 'SELECT * FROM destinos';
//     const [rows] = await conexion.query(query);

//     res.status(200).json(rows); // Devuelve todos los destinos en formato JSON
//   } catch (err) {
//     console.error('ERROR_DESTINO-CONTROLLER.INDEX', err);
//     res.status(500).send('Se ha generado un error al obtener los destinos');
//   }
// }
/* Muestra los destinos y sus relaciones */
destinoController.index = async (req, res) => {
  try {
    const query = `
      SELECT 
        d.id_destino, 
        d.descripcion, 
        p.id_provincia, 
        p.nombre_provincia,
        GROUP_CONCAT(c.id_categoria) AS categorias_ids,
        GROUP_CONCAT(c.nombre_categoria) AS categorias_nombres
      FROM 
        Destinos d
        LEFT JOIN provincia p ON d.id_provincia = p.id_provincia
        LEFT JOIN Destinos_Categorias dc ON d.id_destino = dc.id_destino
        LEFT JOIN Categorias c ON dc.id_categoria = c.id_categoria
      GROUP BY 
        d.id_destino, 
        p.id_provincia, 
        p.nombre_provincia
    `;
    
    const [rows] = await conexion.query(query);

    res.status(200).json(rows); // Devuelve todos los destinos con sus provincia y categorías en formato JSON
  } catch (err) {
    console.error('ERROR_DESTINO-CONTROLLER.INDEX', err);
    res.status(500).send('Se ha generado un error al obtener los destinos');
  }
}

destinoController.store = async (req, res) => {

  const {name_destino, descripcion, id_provincia} = req.body;

   // Validar que todos los campos estén presentes
  if (!name_destino || !id_provincia) {
    return res.status(400).json({ error: 'Algunos de los campos son obligatorios.' });
  }

  try {
    const query = `
      INSERT INTO Destinos (name_destino,descripcion, id_provincia) 
      VALUES (?,?,?)
    `;
    const values = [name_destino, descripcion, id_provincia];

    const [result] =  await conexion.query(query, values);

    const response = {
      message: 'Destino creado con éxito',
      Destino: {
        id: result.insertId,
        nombre:name_destino,
        descripcion,
        id_provincia
      }
    };

    res.status(200).json(response); // Envía los datos como Jsom
  } catch (err) {
    console.error('ERROR_DESTINO-CONTROLLER.STORE',err);
    res.status(500).send('Se ha generado un error al cargar el destino');
  }
}

destinoController.show = async (req, res) => {
  const { id_destino } = req.params;

  // Validar que el id_destino esté presente
  if (!id_destino) {
    return res.status(400).json({ error: 'El id_destino es obligatorio.' });
  }

  try {
    const query = `
      SELECT * FROM Destinos 
      WHERE id_destino = ?
    `;
    const values = [id_destino];

    const [result] = await conexion.query(query, values);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Destino no encontrado.' });
    }

    res.status(200).json(result[0]); // Envía los datos del usuario como JSON
  } catch (err) {
    console.error('ERROR_DESTINO-CONTROLLER.SHOW', err);
    res.status(500).send('Se ha generado un error al seleccionar el destino');
  }
}

destinoController.update = async (req, res) => {
    const { id_destino } = req.params;
    const { name_destino, descripcion, id_provincia} = req.body;

    // Validar que todos los campos estén presentes
    if (!name_destino || !id_provincia) {
      return res.status(400).json({ error: 'Alguno de los campos son obligatorios.' });
    }

    // Validar que el id_destino esté presente
    if (!id_destino) {
      return res.status(400).json({ error: 'El id_destino es obligatorio.' });
    }

    // Validar que al menos un campo esté presente para actualizar
    if (!name_destino && !descripcion) {
      return res.status(400).json({ error: 'Al menos un campo debe estar presente para actualizar.' });
    }

    try {
      const updateQuery = `
        UPDATE Destinos 
        SET 
          name_destino = COALESCE(?, name_destino),
          descripcion = COALESCE(?, descripcion),
          id_provincia = COALESCE(?, id_provincia)
        WHERE id_destino = ?
      `;
      const updateValues = [name_destino, descripcion, id_destino, id_provincia];

      const [result] = await conexion.query(updateQuery, updateValues);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Destino no encontrado.' });
      }

      // Recuperar la información actualizada del destino "Mejorar esta consutla"
      const selectQuery = `
        SELECT * FROM Destinos
        WHERE id_destino = ?
      `;
      const [selectResult] = await conexion.query(selectQuery, [id_destino]);

      res.status(200).json({ message: 'Destino actualizado con éxito', destinoActualizado: selectResult[0] });
    } catch (err) {
      console.error('ERROR_DESTINO-CONTROLLER.UPDATE', err);
      res.status(500).send('Se ha generado un error al actualizar el destino');
    }
}
/* seguir aca! */
destinoController.delete = async (req, res) => {
  const { id_destino } = req.params;

  // Validar que el id_destino esté presente
  if (!id_destino) {
    return res.status(400).json({ error: 'El id_destino es obligatorio.' });
  }

  try {
    // Primero, recuperar la información la categoria
    const selectQuery = `
      SELECT * FROM Destinos 
      WHERE id_destino = ?
    `;
    const selectValues = [id_destino];
    const [selectResult] = await conexion.query(selectQuery, selectValues);

    if (selectResult.length === 0) {
      return res.status(404).json({ error: 'Destino no encontrada.' });
    }

    const destinoEliminada = selectResult[0];

    // Luego, eliminar el usuario
    const deleteQuery = `
      DELETE FROM Destinos
      WHERE id_destino = ?
    `;
    const deleteValues = [id_destino];
    const [deleteResult] = await conexion.query(deleteQuery, deleteValues);

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Destino no encontrado.' });
    }

    res.status(200).json({ message: 'Destino eliminada con éxito', destinoEliminada }); // Envía los datos del destino eliminado como JSON
  } catch (err) {
    console.error('ERROR_DESTINO-CONTROLLER.DELETE',err);
    res.status(500).send('Se ha generado un error al eliminar el destino');
  }
}

module.exports = destinoController
