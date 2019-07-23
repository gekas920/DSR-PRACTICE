


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
        owner:{
          type:DataTypes.STRING(30)
        },
        lastOwner:{
            type:DataTypes.STRING(30)
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





