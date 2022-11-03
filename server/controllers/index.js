const { User } = require("../models");
const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, job } = req.body;

      const newUser = await User.create({ username, email, password, job });
      res.status(201).json({ message: "New account added" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email Required" };
      if (!password) throw { name: "Password required" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "invalid email/password" };

      const truePass = compareHash(password, user.password);
      if (!truePass) throw { name: "invalid email/password" };

      const payload = { id: user.id, username: user.username };
      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async user(req, res, next) {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (!user) throw { name: "Data not found" };

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
