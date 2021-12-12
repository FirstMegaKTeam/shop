const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProductsHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, User }) {
      this.belongsTo(User, {
        foreignKey: 'userId',
      });
      this.belongsTo(Product, {
        foreignKey: 'productId',
      });
    }
  }
  UserProductsHistory.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'userProductsHistories',
    modelName: 'UserProductsHistory',
  });
  return UserProductsHistory;
};
