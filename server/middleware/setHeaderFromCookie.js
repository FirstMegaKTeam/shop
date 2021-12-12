async function setHeader(req, res, next) {
  const { auth } = req.signedCookies
  if (auth) {
    req.headers.authorization = `Bearer ${auth}`;
  }
  next();
}





module.exports = {
  setHeader,
};
