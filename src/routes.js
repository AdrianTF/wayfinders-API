
function router(app) {
    app.use('/api/users', require('./api/components/usuarios/routes'));
    app.use('/api/posts', require('./api/components/publicaciones/routes'));
    app.use('/api/comments', require('./api/components/comentarios/routes'));
    app.use('/api/auth', require('./api/components/auth/routes'))
    app.use('/api/images', require('./api/components/images/controller'))
}

module.exports = router;