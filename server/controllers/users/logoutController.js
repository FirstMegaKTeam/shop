const logout = async (req, res, next) => {
  try {
    res.clearCookie('auth');
    res.json('You are logout');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  logout,
};
