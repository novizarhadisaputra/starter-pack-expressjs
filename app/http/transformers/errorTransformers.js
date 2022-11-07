module.exports = (req, res, status, data) => {
    let collection = data;
    if (data != null && status > 300) {
        let tmp = {};
        if (Array.isArray(data)) {
            data.forEach((el, i) => {
                if (el?.param) {
                    tmp[el.param] = [];
                }
            });
            data.forEach((el, i) => {
                if (el?.param) {
                    tmp[el.param].push(req.t(el.msg, { attribute: el.param }));
                }
            });
            collection = tmp;
        };
    }
    return res.status(status).json({ status, message: req.t(status), data: collection });
}