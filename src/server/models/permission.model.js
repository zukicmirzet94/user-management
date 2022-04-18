const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('permission', {
        code: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false
        })
}