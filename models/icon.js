module.exports = (sequelize, DataTypes) => {
    const Icon = sequelize.define('Icons', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CssClass: {
            type: DataTypes.STRING,
            validate: { len: [1, 20] },
            allowNull: false
        }
        
    }, {timestamps: false});

    return Icon;
};