const Sequelize = require("sequelize");
const mongoose = require('mongoose');

exports.config = {
    mysql: {
        HOST: process.env.DB_HOST,
        NAME: process.env.DB_NAME,
        USERNAME: process.env.DB_USERNAME,
        PASSWORD: process.env.DB_PASSWORD,
        DIALECT: process.env.DB_DRIVER,
        POOL: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    mongodb: {
        HOST: process.env.MONGODB_HOST,
        NAME: process.env.MONGODB_NAME,
        CLUSTERNAME: process.env.MONGODB_CLUSTER_NAME,
        USERNAME: process.env.MONGODB_USERNAME,
        PASSWORD: process.env.MONGODB_PASSWORD,
    }
}

exports.connection = {
    mysql: () => {
        let sequelize = new Sequelize(this.config.mysql.NAME, this.config.mysql.USERNAME, this.config.mysql.PASSWORD, {
            host: this.config.mysql.HOST,
            dialect: this.config.mysql.DIALECT,
            operatorsAliases: 0,
            pool: {
                max: this.config.mysql.POOL.max,
                min: this.config.mysql.POOL.min,
                acquire: this.config.mysql.POOL.acquire,
                idle: this.config.mysql.POOL.idle
            }
        });
        return sequelize;
    },
    mongodb: () => {
        let host = this.config.mongodb.HOST;
        let name = this.config.mongodb.NAME;
        let clusterName = this.config.mongodb.CLUSTERNAME;
        let username = this.config.mongodb.USERNAME;
        let password = this.config.mongodb.PASSWORD;

        let connectionUrl = `${host}://${username}:${password}@${clusterName}.nhtb7.mongodb.net/${name}?retryWrites=true&w=majority`

        if (host == 'localhost' || host == '127.0.0.1') {
            connectionUrl = `mongodb://localhost:27017/${name}`;
        }

        return connectionUrl;
    }
}

exports.load = {
    mysql: async () => {
        const db = require("../app/models/mysql");
        db.sequelize.sync()
            .then(() => {
                console.log("SQL Connected");
            })
            .catch(error => {
                console.log('error :>> ', error.message);
            });
    },
    mongodb: async () => {
        try {
            let connectionUrl = this.connection.mongodb();
            await mongoose.connect(connectionUrl);
            console.log('MongoDB Connected');
        } catch (error) {
            console.log('error :>> ', error.message);
        }
    }
}