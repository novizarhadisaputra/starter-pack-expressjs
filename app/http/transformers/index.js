const errorTransformers = require("./errorTransformers");
const responseTransformers = require("./responseTransformers");
const userTransformers = require("./userTransformers");

module.exports = {
    responseTransformers: responseTransformers,
    errorTransformers: errorTransformers,
    userTransformers: userTransformers

}