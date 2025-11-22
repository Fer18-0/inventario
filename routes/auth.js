const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');  // <--- Importamos mongo

// Mostrar login
router.get('/login', (req, res) => {
    res.render('login');
});

// Procesar login con MongoDB
router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    try {
        const user = await Usuario.findOne({ usuario });

        if (!user) {
            req.flash('error', 'Usuario no encontrado');
            return res.redirect('/login');
        }

        if (user.password !== password) { 
            req.flash('error', 'Contraseña incorrecta');
            return res.redirect('/login');
        }

        // Guardamos sesión
        req.session.user = {
            id: user._id,
            nombre: user.usuario,
            rol: user.rol
        };

        req.flash('success', 'Bienvenido ' + user.usuario);
        return res.redirect('/items');

    } catch (error) {
        console.log(error);
        req.flash('error', 'Error interno');
        res.redirect('/login');
    }
});

// Cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Acceso denegado
router.get('/acceso-denegado', (req, res) => {
    res.render("accesoDenegado");
});
// SOLO PARA REGISTRAR USUARIOS NUEVOS
router.get('/registrar', (req, res) => {
    res.render('registrar');
});

router.post('/registrar', async (req, res) => {
    const { usuario, password, rol } = req.body;

    try {
        const nuevo = new Usuario({ usuario, password, rol });
        await nuevo.save();
        req.flash('success', 'Usuario registrado correctamente');
        res.redirect('/login');
    } catch (err) {
        console.log(err);
        req.flash('error', 'Error al registrar usuario');
        res.redirect('/registrar');
    }
});
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});


module.exports = router;
