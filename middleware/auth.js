module.exports = {
  protegerRuta(req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'Debes iniciar sesión');
      return res.redirect('/login');
    }
    next();
  },

  soloAdmin(req, res, next) {
    if (req.session.user.rol !== "admin") {
      return res.redirect('/acceso-denegado');
    }
    next();
  }
};
