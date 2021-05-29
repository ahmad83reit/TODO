//=============================================================
// RewardsController.js v1.0.0
//=============================================================
//=============================================================
//Author:Ammar 29-07-2020
//Updated:
//=============================================================
/**
*@desc Rewards controller to handling API CRUD operation.
*@version 1.0
*/



const ErrorResponse = require('../utils/errorReponse');


const asyncHandler = require('../middleware/asyncHandler');

//import rewards Model
const Rewards = require('../models/RewardsModel');

/**
*@desc invoke get method from DAL
*@route GET /api/v1/reward
*@access private
*@return json object 
*/
exports.getRewardsAll =  asyncHandler(async (req, res, next) => {

  const compIdvalue= req.headers.comp_id;
  let query = Rewards.find({compId:compIdvalue}).populate({
   
    path: 'JobTitleID',
    model: 'JobTitleType',
  
   });

   const reward = await query;

   return res.status(200).json({
    success: true,
    count: reward.length,
    data: reward,

  });

  });

/**
*@desc Invoke get method from DAL by pass id of rewards
*@route GET /api/v1/reward/:id
*@access private
*@param Id {string} refrences parameter-entity Id
*@return json object 
*/
exports.getRewardsById =asyncHandler(async (req, res, next) => {
    const reward = await Rewards.findById(req.params.id);
  
    if (!reward) {
      return next(
        new ErrorResponse(`rewards not found with id of ${req.params.id}`, 404)
      );
    }
  
    res.status(200).json({ success: true, data: reward });
  });


/**
*@desc Create rewards handler
*@route POST /api/v1/reward
*@access private
*@param 
*/
exports.createRewards = asyncHandler(async (req, res, next) => {
    
  req.body.compId= req.headers.comp_id;
  const reward = await Rewards.create(req.body);
   
    res.status(201).json({
      success: true,
      message: "rewards Created",
      data: reward
    });
  });




/**
*@desc Invoke update method from DAL by pass id of rewards
*@route PUT /api/v1/reward/:id
*@access private
*@param Id {string} refrences parameter-entity Id
*@return json object 
*/
exports.updateRewards = asyncHandler(async (req, res, next) => {
   
  
    reward = await Rewards.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!reward) {
      return next(
        new ErrorResponse(`rewards not found with id of ${req.params.id} Failed to update`, 404)
      );
    }
    res.status(200).json({ success: true,  message: "rewards Updated",data: reward });
  });
/**
*@desc Invoke delete  method from DAL by pass id of rewards
*@route DELETE /api/v1/reward/:id
*@access private
*@param Id {string} refrences parameter-entity Id
*@return json object 
*/
exports.removeRewards = asyncHandler(async (req, res, next) => {
    const reward = await Rewards.findById(req.params.id);
  
    if (!reward) {
      return next(
        new ErrorResponse(`rewards not found with id of ${req.params.id}`, 404)
      );
    }
  
   
    reward.remove();
  
    res.status(200).json({ success: true, message: "rewards deleted", data: {} });
  });