const User = require('../models/mongodb/user');

exports.index = async (req) => {
    try {
        let models = await User.find({ deletedAt: null });
        return models;
    } catch (error) {
        throw error;
    }
};

exports.findOne = async (id) => {
    try {
        let models = await User.findOne(id);
        return models;
    } catch (error) {
        throw error;
    }
}

exports.create = async (req) => {
    try {
        let models = await User.create({
            name: req.name
        });
        return models;
    } catch (error) {
        throw error;
    }
}

exports.search = () => {
    try {

    } catch (error) {
        throw error;
    }
}

