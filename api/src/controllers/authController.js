
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conexion = require('../database/connection.js');
const authController = {};

authController.login = async (req, res) => {

  const { correo_electronico, password } = req.body;

  // Validar que todos los campos estén presentes
  if (!correo_electronico || !password) {
    return res.status(400).json({ error: 'Correo electrónico y contraseña son obligatorios.' });
  }

   const connection = await conexion.getConnection(); // Obtener una conexión

  try {
    const query = `SELECT * FROM Login WHERE usuario = ?`;
    const values = [correo_electronico];

    const [rows] = await connection.query(query, values);

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado.' });
    }

    const user = rows[0];
    

    if (!user.contrasenia) {
      return res.status(500).json({ error: 'Error en el servidor: contraseña no definida.' });
    }

      // Verificar longitud de la contraseña hasheada
    if (user.contrasenia.length !== 60) {
      return res.status(500).json({ error: 'Contraseña hasheada tiene una longitud incorrecta.' });
    }


    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.contrasenia);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Contraseña incorrecta.' });
    }

    // Crear token JWT
    const token = jwt.sign({ id: user.id_usuario, correo_electronico: user.usuario }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id_usuario,
        correo_electronico: user.usuario
      }
    });

  } catch (err) {
    console.error('ERROR_AUTH-CONTROLLER.LOGIN', err);
    res.status(500).send('Se ha generado un error al iniciar sesión.');
  } finally {
    connection.release(); // Liberar la conexión
  }
};

module.exports = authController;