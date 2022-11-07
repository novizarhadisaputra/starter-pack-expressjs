const { validationResult } = require('express-validator');
const userService = require('../../services/userService');
const { responseTransformers, userTransformers, errorTransformers } = require('../transformers');
const { allData, detailData } = userTransformers;

exports.index = async (req, res) => {
    try {
        let models = await userService.index(req);
        let transform = allData(models);
        return transform(req, res);
    } catch (error) {
        return responseTransformers(req, res, 400, error.message);
    }
};

exports.store = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorTransformers(req, res, 400, errors.array());
        }
        let models = await userService.create(req);
        let transform = allData(models);
        return transform(req, res);
    } catch (error) {
        return responseTransformers(req, res, 400, error.message);
    }
};

exports.show = async (req, res) => {
    try {
        let models = await userService.findOne(req.id);
        let transform = detailData(models);
        return transform(req, res);
    } catch (error) {
        return responseTransformers(req, res, 400, error.message);
    }
};

exports.update = async (req, res) => {
};