


'use strict';
module.exports = (sequelize, DataTypes) => {
    var Equipment = sequelize.define('Equipment', {
        name: {
            allowNull: false,
            type: DataTypes.STRING(30)
        },
        availability: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });

    Equipment.associate = function (models) {
        models.Equipment.belongsTo(models.User, {
            onDelete:'SET NULL',
            constraints:false
        });
    };

    return Equipment;
};





