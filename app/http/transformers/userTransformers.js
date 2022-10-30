const responseTransformers = require("./responseTransformers");

function item(model) {
    let obj = {};
    obj.id = model.id;
    return obj;
}

exports.allData = (models = []) => {
    let customData = models.map(el => item(el));
    return (req, res) => responseTransformers(req, res, 200, customData);
}

exports.detailData = (model = []) => {
    let customData = item(model);
    return (req, res) => responseTransformers(req, res, 200, customData);
}