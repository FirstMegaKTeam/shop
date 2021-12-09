module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('ratingProducts', {
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
    await queryInterface.dropTable('ratingProducts');
  },
};
