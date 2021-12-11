const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
  const { user } = req;

  try {
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.cookie('jwt', token);
    res.json('cookie is set');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginUser,
};