const { User, Order } = require('../../DB/models/index');

const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await Order.findAll();
    res.json(allOrders);
  } catch (e) {
    next(e);
  }
};

const getOrdersByStatus = async (req, res, next) => {
  const { status } = req.params;
  try {
    if (!(status === 'in-progress'
        || status === 'send'
        || status === 'close'
        || status === 'not-paid')) {
      // todo all status how we can use
      throw new Error('This status dont exist');
    }
    const ordersFindByStatus = await Order.findAll({
      where: { status },
    });

    res.json(ordersFindByStatus);
  } catch (e) {
    next(e);
  }
};

const getUserWitchOrders = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error('Id dont exist');
    }
    const userAndOrders = await User.findAll({
      where: { id },
      include: {
        model: Order,

      },
    });

    if (!userAndOrders || !userAndOrders.length) {
      throw new Error('User dont exist');
    }

    res.json(userAndOrders);
  } catch (e) {
    next(e);
  }
};

const getOneOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error('Id dont exist');
    }

    const oneOrder = await Order.findOne({ where: { id } });

    if (!oneOrder) {
      throw new Error('Order dont exist');
    }

    res.json(oneOrder);
  } catch (e) {
    next(e);
  }
};

const editOneOrder = async (req, res, next) => {
  const { id, newInfoObj } = req.body;

  try {
    if (!id || !newInfoObj) {
      throw new Error('Wrong data');
    }
    const orderToEdit = await Order.findOne({ where: { id } });
    if (!orderToEdit) {
      throw new Error('Order dont exist');
    }
    Object.assign(orderToEdit, newInfoObj);
    await orderToEdit.save();
    res.json(orderToEdit);
  } catch (e) {
    next(e);
  }
};

const deleteOneOrder = async (req, res, next) => {
  const { id } = req.body;

  try {
    if (!id) {
      throw new Error('Id dont exist');
    }
    const orderToRemove = await Order.findOne({ where: { id } });
    if (!orderToRemove) {
      throw new Error('Order dont exist');
    }
    await orderToRemove.destroy();
    res.json(orderToRemove);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllOrders,
  getOrdersByStatus,
  getUserWitchOrders,
  getOneOrder,
  editOneOrder,
  deleteOneOrder,
};
