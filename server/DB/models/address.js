const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  Address.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },

    country: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: { msg: 'You must give country' },
        notEmpty: { msg: 'Country cant be empty string' },
      },
    },
    city: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        notNull: { msg: 'You must give city' },
        notEmpty: { msg: 'City cant be empty string' },
      },
    },
    zipCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notNull: { msg: 'You must give post code' },
        notEmpty: { msg: 'Post code cant be empty string' },
      },
    },
    street: {
      type: DataTypes.STRING(74),
      allowNull: false,
      validate: {
        notNull: { msg: 'You must give street' },
        notEmpty: { msg: 'Street cant be empty string' },
      },
    },
    homeNo: {
      type: DataTypes.STRING(6),
      allowNull: false,
      validate: {
        notNull: { msg: 'You must give number your home' },
        notEmpty: { msg: 'Home number cant be empty string' },
      },
    },
    apartmentNo: {
      type: DataTypes.STRING(6),
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'address',
    modelName: 'Address',
  });
  return Address;
};
