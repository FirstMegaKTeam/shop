const { User, Order } = require('../../DB/models/index');
const { WrongDataError, NotFoundError, NotAdminError } = require('../../utils/errors');

const getAllOrders = async (req, res, next) => {
  const { user: admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');

    const allOrders = await Order.findAll();

    if (!allOrders || !allOrders.length) throw NotFoundError('Not found any orders');

    res.json(allOrders);
  } catch (e) {
    next(e);
  }
};

const getOrdersByStatus = async (req, res, next) => {
  const { status } = req.params;
  const { user: admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');

    if (!(status === 'in-progress'
        || status === 'send'
        || status === 'close'
        || status === 'not-paid')) {
      // todo all status how we can use
      throw new WrongDataError('This status dont exist');
    }
    const ordersFindByStatus = await Order.findAll({
      where: { status },
    });

    if (!ordersFindByStatus || !ordersFindByStatus.length) {
      throw NotFoundError('Any orders on this status');
    }

    res.json(ordersFindByStatus);
  } catch (e) {
    next(e);
  }
};

const getUserWitchOrders = async (req, res, next) => {
  const { id } = req.params;
  const { user: admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');
    if (!id) throw new WrongDataError('You must give ID');

    const userAndOrders = await User.findAll({
      where: { id },
      include: {
        model: Order,
      },
    });

    if (!userAndOrders || !userAndOrders.length) throw new NotFoundError('User dont exist');

    res.json(userAndOrders);
  } catch (e) {
    next(e);
  }
};

const getOneOrder = async (req, res, next) => {
  const { id } = req.params;
  const { user: admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');
    if (!id) throw new WrongDataError('You must give id');

    const oneOrder = await Order.findOne({ where: { id } });

    if (!oneOrder) throw new NotFoundError('Order dont exist');

    res.json(oneOrder);
  } catch (e) {
    next(e);
  }
};

const editOneOrder = async (req, res, next) => {
  const { id, newInfoObj } = req.body;
  const { user: admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');
    if (!id || !newInfoObj) throw new WrongDataError('Id or edit data be wrong');

    const orderToEdit = await Order.findOne({ where: { id } });

    if (!orderToEdit) throw new NotFoundError('Order dont exist');

    Object.assign(orderToEdit, newInfoObj);
    await orderToEdit.save();
    res.json(orderToEdit);
  } catch (e) {
    next(e);
  }
};

const deleteOneOrder = async (req, res, next) => {
  const { id } = req.body;
  const { user: admin } = req;

  try {
    if (!admin || admin.role < 1) throw new NotAdminError('You re not admin');
    if (!id) throw new WrongDataError('You must give id');

    const orderToRemove = await Order.findOne({ where: { id } });

    if (!orderToRemove) throw new NotFoundError('Order dont exist');

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
