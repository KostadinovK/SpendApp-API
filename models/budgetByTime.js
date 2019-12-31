module.exports = (sequelize, DataTypes) => {
    const BudgetByTime = sequelize.define('BudgetsByTime', {
        UserId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        Year: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        Month: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        BudgetAmount: {
            type: DataTypes.DECIMAL,
            allowNull: false 
        },
    }, {timestamps: false});

    BudgetByTime.associate = (models) => {
        BudgetByTime.belongsTo(models.User, {
            foreignKey: 'UserId'
        });
    };

    return BudgetByTime;
};