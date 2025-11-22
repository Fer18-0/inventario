require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const conectarBD = require('./bd/conexionbd'); 

const app = express();
const PORT = process.env.PORT || 3000;

//Conectar a MongoDB Atlas
conectarBD();

// Configuración general
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.user = req.session.user || null; 
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});


// Variables globales
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});


// Rutas
const authRoutes = require('./routes/auth');
const itemsRoutes = require('./routes/items');
const reservationsRoutes = require('./routes/reservations');

app.use('/', authRoutes); // rutas de login
app.use('/items', itemsRoutes); 
app.use('/reservations', reservationsRoutes);

app.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.redirect('/items');
});
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
