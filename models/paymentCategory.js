module.exports = (sequelize, DataTypes) => {
    const PaymentCategory = sequelize.define('PaymentCategories', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING,
            validate: { is: ["^[a-zA-Z ]+$",'i'], len: [3, 50] },
            allowNull: false
        },
        IconClass: {
            type: DataTypes.STRING,
            validate: { len: [1, 40] },
            allowNull: false
        }
    }, {timestamps: false});

    return PaymentCategory;
};