const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, RatingProducts, UserProductsHistory }) {
      this.belongsToMany(User, {
        through: 'RatingProducts',
        unique: false,
      });
      this.belongsToMany(User, {
        unique: false,
        through: 'UserProductsHistory',

      });
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: { msg: 'You must give name product' },
        notEmpty: { msg: 'Product Name cant be empty string' },
      },
    },
    price: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
      validate: {
        notNull: { msg: 'You must give price product' },
        notEmpty: { msg: 'Price can\'t by empty value' },
      },
    },
    imgUrl: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notNull: { msg: 'You must give img this product' },
        notEmpty: { msg: 'Url  can\'t be empty string' },
      },
    },
    sumRating: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    availability: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
    },
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};
