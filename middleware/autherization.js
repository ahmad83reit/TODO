const redisClient = require('../utils/redisManagement').redisClient;

const requireAuthentication = (req, res, next) => {
  const { auth_token } = req.headers;
  if (!auth_token) {
    return res.status(400).json('Unautherized');
  }
  return redisClient.get(auth_token, (err, replay) => {
    if (err || !replay) {
      return res.status(400).json('Unautherized');
    }
    return next();
  });
};
module.exports = {
  requireAuthentication: requireAuthentication,
};
