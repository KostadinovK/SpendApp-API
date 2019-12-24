module.exports = (sequelize, DataTypes) => {
    const IncomeCategory = sequelize.define('IncomeCategories', {
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

    IncomeCategory.associate = (models) => {
        IncomeCategory.belongsTo(models.Icon, {
            foreignKey: 'IconId'
        })
    };

    return IncomeCategory;
};