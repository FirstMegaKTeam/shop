const {
  NotLoginError,
  NotAdminError,
  NotHeadAdminError,
  WrongPasswordError,
  WrongEmailError,
  AccountActivationError,
  WrongPublicKeyError,
  WrongDataError,
  NotFoundError,
  EmptyBasketError,
  CountError,
  EmptyTokenError,
} = require('../utils/errors');

async function handleError(er, req, res, next) {
  const answer = {
    message: 'Sorry try later',
    status: 500,
  };

  if (er instanceof NotLoginError
   || er instanceof WrongPublicKeyError
  || er instanceof EmptyTokenError) {
    answer.message = er.message;
    answer.status = 401;
  } else if (er instanceof NotAdminError
    || er instanceof NotHeadAdminError
    || er instanceof AccountActivationError) {
    answer.message = er.message;
    answer.status = 403;
  } else if (er instanceof WrongPasswordError
    || er instanceof WrongEmailError
    || er instanceof WrongDataError
    || er instanceof EmptyBasketError
    || er instanceof CountError
    || er instanceof NotFoundError) {
    answer.status = 404;
    answer.message = er.message;
  }

  res.status(answer.status);
  console.log(er);
  res.json(answer);
}

module.exports = {
  handleError,
};
