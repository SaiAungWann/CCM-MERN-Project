const User = require("../model/User");

const createToken = require("./helper/createToken");

const UserController = {
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      let user = await User.login(email, password);

      let token = createToken(user._id);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      return res.json({ user, token });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  register: async (req, res) => {
    try {
      let { name, email, password } = req.body;

      let user = await User.register(name, email, password);

      let token = createToken(user._id);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      return res.json({ user, token });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  logout: (req, res) => {},
};

module.exports = UserController;
