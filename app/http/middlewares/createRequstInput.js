module.exports = (req, res, next) => {
    let queryString = req.query;
    let body = req.body;
    req.input = { ...queryString, ...body };
    next();
}