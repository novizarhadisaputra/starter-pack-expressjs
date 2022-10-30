const createError = require('http-errors');
const { languageData } = require('../../../config/lang');

module.exports = (req, res, next) => {
    const lang = req.headers['accept-language'] ?? 'en';
    if (!languageData.includes(lang)) {
        req.errorMessage = req.t('Your language not support');
        return next(createError(400))
    }
    req.i18n.changeLanguage(lang);
    next();
}