const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { t } = require('i18next');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        req.errorMessage = req.t('Token must be provided');
        next(createError(401));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) next(createError(401, { message: err.message }));
        req.user = user
        next()
    })
}