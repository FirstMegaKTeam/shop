const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: 'sender',
        as: 'sent',

      });
      this.belongsTo(User, {
        foreignKey: 'recipient',
        as: 'received',
      });
    }
  }
  Message.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    sender: {
      type: DataTypes.UUID,
    },
    recipient: {
      type: DataTypes.UUID,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'messages',
    modelName: 'Message',
  });
  return Message;
};
