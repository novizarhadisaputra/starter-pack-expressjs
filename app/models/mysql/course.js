module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("courses", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Course;
};
