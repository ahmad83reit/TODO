//=============================================================
// DepartmentRoute.js v1.0.0
//=============================================================

/**
 *@desc APIRoutes for Department :Routes branch resources
 *@version 1.0
 */

const Express = require('express');
const Router = Express.Router({ mergeParams: true });

const {
  createUser,
  getUserAll,
  getUserById,
  updateUser,
  removeUser,
} = require('../controllers/UserController');

const User = require('../models/UserModel');

const responseResults = require('../middleware/responseResult');

const todoRoute = require('./ToDORoute');

Router.use("/:userId/todo",todoRoute);




Router.route('/')
  .get(responseResults(User, false), getUserAll)
  .post(createUser);

Router.route('/:id').get(getUserById).put(updateUser).delete(removeUser);

module.exports = Router;
