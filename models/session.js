module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('Sessions', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        SessionToken: {
            type: DataTypes.UUID,
            allowNull: false
        },
        ValidTo: {
            type: DataTypes.DATE,
            allowNull: false 
        },
        MaxValidTo: {
            type: DataTypes.DATE,
            allowNull: false 
        },
        InsertedAt: {
            type: DataTypes.DATE,
            allowNull: false 
        }
    }, {timestamps: false});

    Session.associate = (models) => {
        Session.belongsTo(models.User, {
            foreignKey: 'UserId'
        });
    };

    return Session;
};