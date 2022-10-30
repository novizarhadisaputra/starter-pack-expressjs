module.exports = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    let status = err.status || 500;
    let message = req.errorMessage ? req.errorMessage : req.t(status);
    let data = req.errors ?? null;
    if (req.headers['accept'] == 'application/json') {
        // send json error
        return res.status(status).json({
            status,
            message,
            data
        });
    }

    // render the error page
    return res.render('error');
}