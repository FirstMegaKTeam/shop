async function handleError(er, req, res, next) {
  const answer = {
    message: 'Sorry try later',
    status: 500,
  };

  res.status(answer.status);
  console.log(er);
  res.json(answer);
}

module.exports = {
  handleError,
};
