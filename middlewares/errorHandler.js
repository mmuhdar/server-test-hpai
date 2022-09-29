const { Prisma } = require('@prisma/client');

const errorHandler = (err, req, res, next) => {
  let name = err.name;
  let code = err.code;
  let message = err.message;

  switch (name) {
    case 'InvalidParams':
      code = 404;
      message = err.message;
      break;
    case 'Unauthorized':
      code = 401;
      message = err.message;
      break;
    case 'Forbidden':
      code = 403;
      message = err.message;
      break;
    case 'JsonWebTokenError':
      message = 'Invalid Token';
      code = 401;
      break;
    case 'InvalidToken"':
      message = 'Please Login first !';
      code = 401;
      break;

    default:
      message = err;
      code = 500;
  }
  return res.status(code).json({ message });
};

module.exports = errorHandler;
