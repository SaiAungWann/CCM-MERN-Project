const UserController = {
  login: (req, res) => {
    return res.json({ message: "login is hit" });
  },
  register: async (req, res) => {
    try {
      let { name, email, password } = req.body;

      let UserExist = await User.findOne({ email });
      if (UserExist) {
        throw new error("User already exist");
      }

      let salt = await bcrypt.genSalt(10);
      let hashValue = await bcrypt.hash(password, salt);

      let user = await User.create({ name, email, password: hashValue });
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};

module.exports = UserController;
