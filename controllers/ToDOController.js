//=============================================================
// EmployeeRewardsController.js v1.0.0
//=============================================================
//=============================================================
//Author:Ammar 12-08-2020
//Updated:
//=============================================================
/**
*@desc EmployeeRewards controller to handling API CRUD operation.
*@version 1.0
*/



const ErrorResponse = require('../utils/errorReponse');


const asyncHandler = require('../middleware/asyncHandler');

const ToDO  = require('../models/ToDOModel');



/**
*@desc invoke get method from DAL
*@route GET /api/v1/todo 
*@access private
*@return json object 
*/
exports.getuserToDoAll =  asyncHandler(async (req, res, next) => {


  let filterdData; 
  var query = {};
  var isFilter = false;
   
     if (req.params.userId) {
      query.userId = {$in : req.params.userId};    
      isFilter = true;  
              
    }
  
    if(isFilter){
      filterdData = await ToDO.find(query);
    }
    else 
    {
      filterdData = await ToDO.find();
    
    }

    const todo = await filterdData;      

    res.status(200).json({
      success: true,
      count: todo.length,
      data: todo,
    });
  });


  



/**
*@desc Invoke get method from DAL by pass id of todo
*@route GET /api/v1/todo/:id
*@access private
*@param Id {string} refrences parameter-entity Id
*@return json object 
*/

exports.getUserToDOById =asyncHandler(async (req, res, next) => {

    const todo = await ToDO.findById(req.params.id);
  
    if (!todo) {
      return next(
        new ErrorResponse(`ToDO not found with id of ${req.params.id}`, 404)
      );
    }
  
    res.status(200).json({ success: true, data: employeereward });
  });


/**
*@desc Create Todo handler
*@route POST /api/v1/todo
*@access private
*@param 
*/

exports.createuserToDO = asyncHandler(async (req, res, next) => {

  if(req.params.userId)
  req.body.userId = req.params.userId;

  try{


    const todo = await ToDO.create(req.body);

    res.status(201).json({
      success: true,
      message: "ToDO Created",
      data: todo
    });
  }
  catch(err){
    return next(
      new ErrorResponse(`error ${err}`, 404)
    );
   
  }
  });




/**
*@desc Invoke update method from DAL by pass id of ToDO
*@route PUT /api/v1/todo/:id
*@access private
*@param Id {string} refrences parameter-entity Id
*@return json object 
*/

exports.updateuserToDO = asyncHandler(async (req, res, next) => {
   
    todo = await ToDO.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!todo) {

      return next(

        new ErrorResponse(`ToDO not found with id of ${req.params.id} Failed to update`, 404)
      );

    }

    res.status(200).json({ success: true,  message: "ToDO Updated",data: todo });
  });


/**
*@desc Invoke delete  method from DAL by pass id of ToDO
*@route DELETE /api/v1/todo/:id
*@access private
*@param Id {string} refrences parameter-entity Id
*@return json object 
*/

exports.removeuserToDO = asyncHandler(async (req, res, next) => {

    const todo = await ToDO.findById(req.params.id);
  
    if (!todo) {

      return next(

        new ErrorResponse(`ToDO not found with id of ${req.params.id}`, 404)

      );

    }
  
   
    employeereward.remove();
  
    res.status(200).json({ success: true, message: "ToDO deleted", data: {} });
    
  });