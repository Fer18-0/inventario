const mongoose = require('mongoose');
const Item = require('../models/Item');
require('dotenv').config();
const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/inventario_eventos';

mongoose.connect(dbUrl).then(async () => {
  console.log('Conectado a MongoDB para seed');
  await Item.deleteMany({});
  const items = [
    { name: 'Silla plegable blanca', category: 'Silla', description: 'Silla ligera plegable', pricePerDay: 10, stock: 50 },
    { name: 'Mesa redonda 1.5m', category: 'Mesa', description: 'Mesa para eventos 1.5 metros', pricePerDay: 30, stock: 10 },
    { name: 'Inflable castillo', category: 'Inflable', description: 'Inflable para niños', pricePerDay: 100, stock: 2 }
  ];
  await Item.insertMany(items);
  console.log('Seed completado');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});