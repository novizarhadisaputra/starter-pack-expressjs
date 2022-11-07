module.exports = (req, res, status, data) => {
    return res.status(status).json({ status, message: req.t(status), data: data });
}