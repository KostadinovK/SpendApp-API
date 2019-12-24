module.exports = (sequelize, DataTypes) => {
    const Currency = sequelize.define('Currencies', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING,
            validate: { is: ["^[a-zA-Z ]+$",'i'], len: [3, 50] },
            allowNull: false,
            isUnique: true
        },
        Symbol: {
            type: DataTypes.STRING,
            validate: { len: [1, 3] },
            allowNull: true
        },
        Code: {
            type: DataTypes.STRING,
            validate: { len: [1, 5] },
            allowNull: false,
            isUnique: true
        },
    }, {timestamps: false});

    return Currency;
};