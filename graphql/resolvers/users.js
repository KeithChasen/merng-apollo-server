const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
      // todo: validate user data
      // make sure user doesnt already exist
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