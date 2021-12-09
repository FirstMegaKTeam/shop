module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(75),
        allowNull: false,
        validate: {
          notNull: { msg: 'You must give your name' },
          notEmpty: { msg: 'User name can\'t be empty value' },
        },
      },
      lastName: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
          notNull: { msg: 'You must give your last name' },
          notEmpty: { msg: 'Last name can\'t be empty value' },
        },
      },
      age: {
        type: DataTypes.TINYINT(3),
        unsigned: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'You must give your email' },
          notEmpty: { msg: 'Email can\'t be empty value' },
          isEmail: { msg: 'Email must be a valid email' },
        },
      },
      activate: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      role: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          notNull: { msg: 'You must give password' },
          notEmpty: { msg: 'Password can\'t be empty value' },
        },
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
    await queryInterface.dropTable('users');
  },
};
