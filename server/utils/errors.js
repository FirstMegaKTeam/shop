class NotLoginError extends Error {}
class NotAdminError extends Error {}
class NotHeadAdminError extends Error {}
class WrongPasswordError extends Error {}
class WrongEmailError extends Error {}
class AccountActivationError extends Error {}
class WrongPublicKeyError extends Error {}
class WrongDataError extends Error {}
class NotFoundError extends Error {}
class EmptyBasketError extends Error {}
class CountError extends Error {}
class EmptyTokenError extends Error {}

module.exports = {
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
};
