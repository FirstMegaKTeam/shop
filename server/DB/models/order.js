const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  Order.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue:  'not-paid',
    },

    products: {
      type: DataTypes.JSON,
    },

  }, {
    sequelize,
    tableName: 'orders',
    modelName: 'Order',
  });
  return Order;
};
