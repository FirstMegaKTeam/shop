const { User, Message } = require('../../DB/models/index');
const { NotLoginError, NotFoundError, WrongDataError } = require('../../utils/errors');

const getAllUserMessage = async (req, res, next) => {
  const { user } = req;

  try {
    if (!user) throw new NotLoginError('You are not logged in');

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
      where: { id: user.id },
    });
    if (!userAndMessage) throw new NotFoundError('Dont found user');

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
  const { user } = req;
  const { shippedOrReceived } = req.params;

  try {
    if (!user) throw new NotLoginError('You are not logged in');
    if (!(shippedOrReceived === 'sent' || shippedOrReceived === 'received')) throw new WrongDataError('Your patch argument is wrong');

    // Todo maybe change to search in message
    const sentOrReceivedMessage = await User.findOne({
      include: {
        model: Message,
        as: shippedOrReceived,
        attributes: ['id', 'sender', 'recipient', 'title', 'content', 'createdAt'],
      },
      where: { id: user.id },
    });

    if (!sentOrReceivedMessage) throw new NotFoundError('User or message dont exist');
    res.json(sentOrReceivedMessage);
  } catch (e) {
    next(e);
  }
};

const getOneMessage = async (req, res, next) => {
  const { messageId } = req.params;

  try {
    if (!messageId) throw new WrongDataError('You must give message id');

    const oneMessage = await Message.findOne({ where: { id: messageId } });
    res.json(oneMessage);

    if (!oneMessage) throw new NotFoundError('Message dont exist');
  } catch (e) {
    next(e);
  }
};

const sendMessage = async (req, res, next) => {
  const { user } = req;
  const {
    sender,
    recipient,
    title,
    content,
  } = req.body;
  try {
    if (!user) throw new NotLoginError('You are not logged in');
    if (!sender || !recipient || !title || !content) throw new WrongDataError('You must complete all  data');

    const postedMessage = await Message.create({
      sender: user.id, recipient, title, content,
    });

    res.json(postedMessage);
  } catch (e) {
    next(e);
  }
};

const deleteMessage = async (req, res, next) => {
  const { shippedOrReceived, messageId } = req.body;
  try {
    if (!(shippedOrReceived || messageId)) throw new WrongDataError('Wrong date on delete message');
    if (!(shippedOrReceived === 'sender' || shippedOrReceived === 'recipient')) throw new WrongDataError('Wrong message data');

    const message = await Message.findOne({
      where: { id: messageId },
    });

    if (!message) throw new NotFoundError('Message dont exist');

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
  deleteMessage,
};
