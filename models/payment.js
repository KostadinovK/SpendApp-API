module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payments', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Amount: {
            type: DataTypes.DECIMAL,
            validate: { min: 0 },
            allowNull: false 
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        IsInFuture: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING,
            validate: { len: [1, 30] },
            allowNull: false
        },
        Notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        CategoryId: {
            type: DataTypes.INTEGER
        },
        UserId: {
            type: DataTypes.INTEGER
        }
    }, {timestamps: false});

    Payment.associate = (models) => {
        Payment.belongsTo(models.PaymentCategory, {
            foreignKey: 'CategoryId'
        });

        Payment.belongsTo(models.User, {
            foreignKey: 'UserId'
        });
    };

    return Payment;
};