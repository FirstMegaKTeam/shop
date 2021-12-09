const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RatingProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, Users }) {
      // define aTo(Product);

    }
  }
  RatingProducts.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    rating: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      validate: {
        notNull: { msg: 'You must chose rating' },
        notEmpty: { msg: 'Rating can\'t be empty value' },
      },
    },

    ratingDescription: {
      type: DataTypes.STRING(400),
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    tableName: 'ratingProducts',
    modelName: 'RatingProducts',
  });
  return RatingProducts;
};
