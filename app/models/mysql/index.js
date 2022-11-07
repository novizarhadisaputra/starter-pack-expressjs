const Sequelize = require("sequelize");
const { connection } = require("../../../config/database.js");

let sql = {};
sql.Sequelize = Sequelize;
sql.sequelize = connection.mysql();

sql.tutorials = require("./course")(sql.sequelize, sql.Sequelize);

module.exports = sql;