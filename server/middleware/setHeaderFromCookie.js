async function setHeader(req, res, next) {
  const { auth } = req.signedCookies
  if (auth) {
    req.headers.Authorization = `Bearer ${auth}`;
  }

  next();
}

module.exports = {
  setHeader,
};
