module.exports = function(sequelize, DataTypes) {
    return sequelize.define('customers', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      zipcode: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      address: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      age: {
        type: DataTypes.INTEGER(5),
        allowNull: true
      }
    }, {
      tableName: 'customers',
      timestamps: false
    });
  };
  