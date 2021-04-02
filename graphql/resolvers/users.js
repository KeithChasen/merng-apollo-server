const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput } = require('../../utils/validators');
const { jwtSecret } = require('../../config');
const User = require('../../models/User');

module.exports = {
  Mutation: {
    // parent, args, context, info
    async register(_, { registerInput: {
      username,
      email,
      password,
      confirmPassword
    }}, context, info) {
      // validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // make sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        })
      }
      // hash password and create auth token
      password = await bcrypt.hash(password, 12);

      const  newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
      }, jwtSecret,{ expiresIn: '1h' });

      return {
        ...res._doc,
        id: res._id,
        token
      }

    }
  }
};