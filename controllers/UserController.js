const { PrismaClient } = require('@prisma/client');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

const prisma = new PrismaClient();

class User {
  static async create(req, res, next) {
    const { name, email, password, role } = req.body;
    try {
      const hashingPassword = await hashPassword(password);
      const data = await prisma.user.create({
        data: { name, email, password: hashingPassword, role },
      });
      res.status(201).json({
        message: 'Success create user',
        data: {
          id: data.id,
          email: data.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const findData = await prisma.user.findUnique({
        where: { email },
      });
      if (findData) {
        const checkPassword = await comparePassword(
          password,
          findData.password
        );
        const payload = {
          id: findData.id,
          role: findData.role,
        };

        if (checkPassword) {
          const token = createToken(payload);
          res.status(200).json({
            message: 'Login success',
            token,
          });
        } else {
          throw { name: 'Unauthorized', message: 'email/password are invalid' };
        }
      } else {
        throw { name: 'Unauthorized', message: 'email/password are invalid' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const data = await prisma.user.findMany();
      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    const { id } = req.params;
    try {
      const find = await prisma.user.findUnique({
        where: { id },
      });
      if (!find)
        throw { name: 'InvalidParams', message: `No data found with ID ${id}` };
      res.status(200).json({ data: find });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserById(req, res, next) {
    const { id } = req.params;
    try {
      const find = await prisma.user.findUnique({
        where: { id },
      });
      if (!find)
        throw { name: 'InvalidParams', message: `No data found with ID ${id}` };
      await prisma.user.delete({ where: { id } });
      res.status(200).json({
        message: `Success delete data with ID ${id}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { User };
