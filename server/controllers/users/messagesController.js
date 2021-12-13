const { User, Message } = require('../../DB/models/index');

const getAllUserMessage = async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const userAndMessage = await User.findOne({
      attributes: ['id', 'email', 'name', 'lastName'],
      include: [
        {
          model: Message,
          as: 'received',
          attributes: ['id', 'sender', 'recipient', 'title', 'content', 'createdAt'],
        },
        {
          model: Message,
          as: 'sent',
          attributes: ['id', 'sender', 'recipient', 'title', 'content', 'createdAt'],
        },
      ],

      where: { id: userId },
    });
    /**
    *  user And Message is object
    *  inside have
    *  id(user)
    *  email
    *  name
    *  lastname
        *  sent {its Array obiect}
            *id (message)
            * sender (id user who send message = id user)
            * recipient (its id user who recipt message)
            * title
            * content
            * createdAt (date of send)
        *  received
             *id (message)
             * sender (id user who send message )
             * recipient (its id user who recipt message  === id user)
             * title
             * content
             * createdAt (date of send)
    * */
    res.json(userAndMessage);
  } catch (e) {
    next(e);
  }
};

const getSentOrReceivedUserMessage = async (req, res, next) => {
  const { userId, shippedOrReceived } = req.params;
  try {
    if (!(shippedOrReceived === 'sent' || shippedOrReceived === 'received')) {
      throw new Error('Your patch argument is wrong');
    }

    const sentOrReceivedMessage = await User.findOne({
      include: {
        model: Message,
        as: shippedOrReceived,
        attributes: ['id', 'sender', 'recipient', 'title', 'content', 'createdAt'],
      },
      where: { id: userId },
    });
    res.json(sentOrReceivedMessage);
  } catch (e) {
    next(e);
  }
};

const getOneMessage = async (req, res, next) => {
  const { messageId } = req.params;
  try {
    const oneMessage = await Message.findOne({ where: { id: messageId } });
    res.json(oneMessage);
  } catch (e) {
    next(e);
  }
};

const sendMessage = async (req, res, next) => {
  const {
    sender,
    recipient,
    title,
    content,
  } = req.body;
  try {
    const postedMessage = await Message.create({
      sender, recipient, title, content,
    });

    res.json(postedMessage);
  } catch (e) {
    next(e);
  }
};

const deleteMessage = async (req, res, next) => {
  const { shippedOrReceived, messageId } = req.body;
  try {
    if (!(shippedOrReceived || messageId)) {
      throw new Error('wrong date on delete message');
    }
    if (!(shippedOrReceived === 'sender' || shippedOrReceived === 'recipient')) {
      throw new Error('Wrong message data');
    }
    const message = await Message.findOne({
      where: { id: messageId },
    });

    message[shippedOrReceived] = null;
    await message.save();
    res.json(message);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUserMessage,
  getSentOrReceivedUserMessage,
  getOneMessage,
  sendMessage,
  deleteMessage
};
