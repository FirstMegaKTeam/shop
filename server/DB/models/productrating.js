const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductRating extends Model {
    i;

    static associate({ User, Product }) {
      this.belongsTo(User, {
        foreignKey: 'userId',
      });
      this.belongsTo(Product, {
        foreignKey: 'productId',
      });
    }
  }
  ProductRating.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: 'compositeIndex',
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: 'compositeIndex',
    },

    rating: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    tableName: 'productRatings',
    modelName: 'ProductRating',
  });
  return ProductRating;
};
