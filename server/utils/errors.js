class NotLogingError extends Error {}
class NotAdminError extends Error {}
class NotHeadAdminError extends Error {}
class WrongPasswordError extends Error {}
class WrongEmailError extends Error {}
class AccountActivationError extends Error {}
class WrongPublicKeyError extends Error {}
class WrongDataError extends Error {}
class NotFoundError extends Error {}

module.exports = {
  NotLogingError,
  NotAdminError,
  NotHeadAdminError,
  WrongPasswordError,
  WrongEmailError,
  AccountActivationError,
    WrongPublicKeyError,
    WrongDataError,
    NotFoundError,


};
