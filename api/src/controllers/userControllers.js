const userController = {};
const conexion = require('../database/connection.js');
const bcrypt = require('bcryptjs');

userController.index = async (req, res) => {
  try {
    const query = 'SELECT * FROM Usuario';
    const [rows] = await conexion.query(query);

    res.status(200).json(rows); // Devuelve todos los usuarios en formato JSON
  } catch (err) {
    console.error('ERROR_USER-CONTROLLER.INDEX', err);
    res.status(500).send('Se ha generado un error al obtener los Usuarios');
  }
};

userController.store = async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, domicilio_ciudad, domicilio_departamento, telefono, correo_electronico,password } = req.body;

   // Validar que todos los campos estén presentes
  if (!nombre || !apellido || !fecha_nacimiento || !domicilio_ciudad || !domicilio_departamento || !telefono || !correo_electronico || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const connection = await conexion.getConnection(); // Obtener una conexión
  await connection.beginTransaction(); // Iniciar una transacción

  try {
     const hashedPassword = await bcrypt.hash(password, 10); // Hashear la contraseña con un salt de 10 rondas
    const query = `
      INSERT INTO Usuario (nombre, apellido, fecha_nacimiento, domicilio_ciudad, domicilio_departamento, telefono, correo_electronico, rol) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [nombre, apellido, fecha_nacimiento, domicilio_ciudad, domicilio_departamento, telefono, correo_electronico, false];

    const [result] =  await connection.query(query, values);
    const userId = result.insertId; // Obtener el ID del usuario insertado

    const query2 = `
      INSERT INTO Login (usuario, contrasenia, id_usuario) 
      VALUES (?, ?, ?)
    `;
    const values2 = [correo_electronico, hashedPassword, userId];

    await connection.query(query2, values2);

    await connection.commit(); // Confirmar la transacción

    const response = {
      message: 'Usuario creado con éxito',
      user: {
        id: result.insertId,
        nombre,
        apellido,
        fecha_nacimiento,
        domicilio_ciudad,
        domicilio_departamento,
        telefono,
        correo_electronico,
        rol: false
      }
    };


    res.status(200).json(response); // Envía los datos como 
  } catch (err) {
      await connection.rollback(); // Revertir la transacción en caso de error
      console.error('ERROR_USER-CONTROLLER.STORE',err);
      res.status(500).send('Se ha generado un error al registrar al usuario');
  } finally {
    connection.release(); // Liberar la conexión
  }
}

userController.delete = async (req, res) => {
  const { id_usuario } = req.params;

  // Validar que el id_usuario esté presente
  if (!id_usuario) {
    return res.status(400).json({ error: 'El id_usuario es obligatorio.' });
  }

  try {
    // Primero, recuperar la información del usuario
    const selectQuery = `
      SELECT * FROM Usuario 
      WHERE id_usuario = ?
    `;
    const selectValues = [id_usuario];
    const [selectResult] = await conexion.query(selectQuery, selectValues);

    if (selectResult.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const usuarioEliminado = selectResult[0];

    // Luego, eliminar el usuario
    const deleteQuery = `
      DELETE FROM Usuario 
      WHERE id_usuario = ?
    `;
    const deleteValues = [id_usuario];
    const [deleteResult] = await conexion.query(deleteQuery, deleteValues);

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    res.status(200).json({ message: 'Usuario eliminado con éxito', usuarioEliminado }); // Envía los datos del usuario eliminado como JSON
  } catch (err) {
    console.error('ERROR_USER-CONTROLLER.DELETE',err);
    res.status(500).send('Se ha generado un error al eliminar al usuario');
  }
}

userController.show = async (req, res) => {
  const { id_usuario } = req.params;

  // Validar que el id_usuario esté presente
  if (!id_usuario) {
    return res.status(400).json({ error: 'El id_usuario es obligatorio.' });
  }

  try {
    const query = `
      SELECT * FROM Usuario 
      WHERE id_usuario = ?
    `;
    const values = [id_usuario];

    const [result] = await conexion.query(query, values);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    res.status(200).json(result[0]); // Envía los datos del usuario como JSON
  } catch (err) {
    console.error('ERROR_USER-CONTROLLER.SHOW', err);
    res.status(500).send('Se ha generado un error al seleccionar al usuario');
  }
}

userController.update = async (req, res) => {
  const { id_usuario } = req.params;
  const { nombre, apellido, fecha_nacimiento, domicilio_ciudad, domicilio_departamento, telefono, correo_electronico } = req.body;

   // Validar que todos los campos estén presentes
  if (!nombre || !apellido || !fecha_nacimiento || !domicilio_ciudad || !domicilio_departamento || !telefono || !correo_electronico) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Validar que el id_usuario esté presente
  if (!id_usuario) {
    return res.status(400).json({ error: 'El id_usuario es obligatorio.' });
  }

  // Validar que al menos un campo esté presente para actualizar
  if (!nombre && !apellido && !fecha_nacimiento && !domicilio_ciudad && !domicilio_departamento && !telefono && !correo_electronico) {
    return res.status(400).json({ error: 'Al menos un campo debe estar presente para actualizar.' });
  }

  try {
    const updateQuery = `
      UPDATE Usuario 
      SET 
        nombre = COALESCE(?, nombre),
        apellido = COALESCE(?, apellido),
        fecha_nacimiento = COALESCE(?, fecha_nacimiento),
        domicilio_ciudad = COALESCE(?, domicilio_ciudad),
        domicilio_departamento = COALESCE(?, domicilio_departamento),
        telefono = COALESCE(?, telefono),
        correo_electronico = COALESCE(?, correo_electronico)
      WHERE id_usuario = ?
    `;
    const updateValues = [nombre, apellido, fecha_nacimiento, domicilio_ciudad, domicilio_departamento, telefono, correo_electronico, id_usuario];

    const [result] = await conexion.query(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Recuperar la información actualizada del usuario
    const selectQuery = `
      SELECT * FROM Usuario 
      WHERE id_usuario = ?
    `;
    const [selectResult] = await conexion.query(selectQuery, [id_usuario]);

    res.status(200).json({ message: 'Usuario actualizado con éxito', usuarioActualizado: selectResult[0] });
  } catch (err) {
    console.error('ERROR_USER-CONTROLLER.UPDATE', err);
    res.status(500).send('Se ha generado un error al actualizar el usuario');
  }
}

module.exports = userController