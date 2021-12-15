module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('orders', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      status: DataTypes.STRING(20),

      products: DataTypes.JSON,

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
    await queryInterface.dropTable('orders');
  },
};
