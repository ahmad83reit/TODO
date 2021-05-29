const jwt = require('jsonwebtoken');

exports.signToken = (user) => {
  const { userId, userEmail } = user;
  const payload = { userId, userEmail };
  return jwt.sign(payload, process.env.JWT_SCREET, {
    // expiresIn: process.env.EXPIRE_TOKEN,
  });
};
