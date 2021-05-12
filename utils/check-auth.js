const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const { jwtSecret } = require('../config') || null;

const jwtSECRET = process.env.JWT || jwtSecret;

module.exports = context => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        return  jwt.verify(token, jwtSECRET);
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error('Authorization token must be "Bearer [token]"')
  }
  throw new Error('Authorization header must be provided')
};
