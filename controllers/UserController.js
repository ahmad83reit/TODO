//=============================================================
// UserController.js v1.0.0
//=============================================================
//=============================================================
//Author:Hani 25-07-2020
//Updated: Hani 4-8-2020
//Updated: Hani 24-3-2021
//=============================================================
/**
 *@desc User controller to handling API CRUD operation.
 *@version 1.0
 */

const ErrorResponse = require('../utils/errorReponse');

const asyncHandler = require('../middleware/asyncHandler');

const { signToken } = require('../utils/tokenManagement');

//import User Model
const User = require('../models/UserModel');
const cryptoRandomString = require('crypto-random-string');

const { SendEmail } = require('../utils/mailManagement');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
/**
 *@desc invoke get method from DAL
 *@route GET /api/v1/user
 *@access private
 *@return json object
 */
exports.getUserAll = asyncHandler(async (req, res, next) => {




 
   res.status(200).json(res.responseResults);



  
  // console.log(req);
 // res.status(200).json(res.responseResults);
});

/**
 *@desc Invoke get method from DAL by pass id of user
 *@route GET /api/v1/user/:id
 *@access private
 *@param Id {string} refrences parameter-entity Id
 *@return json object
 */
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: user });
});

/**
 *@desc Create User handler
 *@route POST /api/v1/user
 *@access private
 *@param
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  //console.log('User Create');
  const avatar = gravatar.url(req.body.email, {
    s: '200', // Size
    r: 'pg', // Rating
    d: 'mm', // Default
  });
  req.body.avatar = avatar;
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    message: 'User Created',
    data: user,
  });
});

/**
 *@desc Invoke update method from DAL by pass id of User
 *@route PUT /api/v1/User/:id
 *@access private
 *@param Id {string} refrences parameter-entity Id
 *@return json object
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  if (req.body.email) {
    const avatar = gravatar.url(req.body.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm', // Default
    });
    req.body.avatar = avatar;
  }
 
  req.body.compId=req.headers.comp_id;
  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(
      new ErrorResponse(
        `User not found with id of ${req.params.id} Failed to update`,
        404
      )
    );
  }
  res.status(200).json({ success: true, message: 'User Updated', data: user });
});


/**
 *@desc Invoke delete  method from DAL by pass id of User
 *@route DELETE /api/v1/user/:id
 *@access private
 *@param Id {string} refrences parameter-entity Id
 *@return json object
 */
exports.removeUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  user.remove();

  res.status(200).json({ success: true, message: 'User deleted', data: {} });
});
