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
        IconId: {
            type: DataTypes.INTEGER
        }
    }, {timestamps: false});

    PaymentCategory.associate = (models) => {
        PaymentCategory.belongsTo(models.Icon, {
            foreignKey: 'IconId'
        })
    };

    return PaymentCategory;
};