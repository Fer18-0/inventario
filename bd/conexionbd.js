// bd/conexion.js
const mongoose = require('mongoose');
require('dotenv').config();

const conectarBD = async () => {
  try {
    const dbUrl = process.env.MONGO_URI;
    if (!dbUrl) {
      throw new Error(' No se encontró la variable MONGO_URI en .env');
    }

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conectado a MongoDB Atlas correctamente');
  } catch (error) {
    console.error('Error al conectar con MongoDB Atlas:', error.message);
    process.exit(1);
  }
};

module.exports = conectarBD;
