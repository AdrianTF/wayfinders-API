
function router(app) {
    app.use('/api/users', require('./api/components/usuarios/routes'));
    // app.use('/api/posts', require(''));
    // app.use('/api/comments', require(''));
}

module.exports = router;