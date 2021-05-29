const redis = require('redis');
const redisClient = redis.createClient();

exports.setToken = async (token, userData) => {
  try {
   
    return await redisClient.set(token, JSON.stringify(userData));
  } catch (err) {
    return { err };
  }
};

exports.getTokenData = async (token, callbackData) => {
  //console.log(token);

  return await redisClient.get(token, (err, replay) => {
    let resp;
    if (err || !replay) {
      resp = {
        status: 400,
        sucess: false,
        message: 'Unautherized',
      };

      return callbackData(resp);
    }

    return callbackData(replay);
  });
};
exports.removeTokenData = async (token, callbackData) => {
  //console.log(token);

  return await redisClient.del(token, (err, replay) => {
    let resp;
    if (err || !replay) {
      resp = {
        status: 404,
        sucess: false,
        message: 'Key Note Exist',
      };

      return callbackData(resp);
    }

    return callbackData(replay);
  });
};
exports.redisClient = redisClient;
