module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('products', {
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
      description: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('products');
  },
};
