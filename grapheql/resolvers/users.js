const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // TODO Validate user data
      // TODO Makes sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("email already in the database", {
          errors: {
            username: "email already in the database",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
