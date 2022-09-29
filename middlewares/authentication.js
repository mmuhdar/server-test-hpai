const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../helpers/jwt');

const prisma = new PrismaClient();

const authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  const access_token = authorization.split(' ')[1];
  try {
    const { id } = verifyToken(access_token);
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw {
        name: 'InvalidToken',
      };
    } else {
      req.user = {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
