module.exports = (sequelize, DataTypes) => {
    const Income = sequelize.define('Incomes', {
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

    Income.associate = (models) => {
        Income.belongsTo(models.IncomeCategory, {
            foreignKey: 'CategoryId'
        });

        Income.belongsTo(models.User, {
            foreignKey: 'UserId'
        });
    };

    return Income;
};