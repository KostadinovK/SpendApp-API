const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Username: {
            type: DataTypes.STRING,
            validate: { is: ["^[a-z0-9A-Z]+$",'i'], len: [3, 30] },
            allowNull: false,
            isUnique: true
        },
        Password: {
            type: DataTypes.STRING,
            validate: { len: [6, 255] },
            allowNull: false
        },
        BudgetAmount: {
            type: DataTypes.DECIMAL,
            validate: { min: 0 },
            allowNull: false
        },
        CurrencyId: {
            type: DataTypes.INTEGER
        },
        RegisterTimestamp: {
            type: DataTypes.DATE
        }

    }, {timestamps: false});

    User.associate = (models) => {
        User.belongsTo(models.Currency, {
            foreignKey: 'CurrencyId'
        })

        User.hasMany( models.Payment, { as: 'Payments' } );
        User.hasMany( models.Income, { as: 'Incomes' } );
        User.hasMany( models.BudgetByTime, { as: 'BudgetsByTime' } );
    };

    User.beforeCreate((user, options) => {

        return bcrypt.hash(user.Password, 10)
            .then(hash => {
                user.Password = hash;
            })
            .catch(err => { 
                throw new Error(); 
            });
    });

    return User;
};