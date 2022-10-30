module.exports = function transform(req, res, status, data) {
    return res.status(status).json({ status, message: req.t(status), data });
}