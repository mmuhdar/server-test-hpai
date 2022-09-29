const authentication = async (req, res, next) => {
  try {
    const {role} = req.user;
    if (role !== 'admin') {
      throw {
        name: 'Forbidden',
        message: 'Forbidden'
      };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
