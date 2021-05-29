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
  createuserToDO,
  getuserToDoAll,
  getUserToDOById,
  updateuserToDO,
  removeuserToDO
  } = require('../controllers/ToDOController');

  const ToDO = require('../models/ToDOModel');

  const responseResults = require('../middleware/responseResult');






 




Router
.route('/')
.get(responseResults(ToDO,false),getuserToDoAll)
.post(createuserToDO);

Router
.route('/:id')
.get(getUserToDOById)
.put(updateuserToDO)
.delete(removeuserToDO);
  
   
module.exports=Router;