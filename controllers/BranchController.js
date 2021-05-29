//=============================================================
// BranchController.js v1.0.0
//=============================================================
//=============================================================
//Author:Hani 31-5-2020
//Updated:
//=============================================================
/**
*@desc Branch controller to handling API CRUD operation.
*@version 1.0
*/



const ErrorResponse = require('../utils/errorReponse');


const asyncHandler = require('../middleware/asyncHandler');

//import Branch Model
const Branch = require('../models/BranchModel');

/**
*@desc invoke get method from DAL
*@route GET /api/v1/branch
*@access private
*@return json object 
*/
exports.getBranchAll =  asyncHandler(async (req, res, next) => {
 // console.log(req);
 let query;
 const compIdvalue= req.headers.comp_id;
console.log("compis is"+compIdvalue);
 if (compIdvalue) {
  query = await Branch.find({ compId: compIdvalue }).populate( 'Department').populate('Teams').populate('EMPS');
  
} else {
  query = Branch.find().populate( 'Department').populate('Teams').populate('EMPS');

 
}
const branch = await query;

  res.status(200).json({
    success: true,
    count: branch.length,
    data: branch,
  });
});



    //res.status(200).json(res.responseResults);


/**
*@desc Invoke get method from DAL by pass id of Branch
*@route GET /api/v1/branch/:id
*@access private
*@param Id {string} refrences parameter-entity Id
*@return json object 
*/
exports.getBranchById =asyncHandler(async (req, res, next) => {
    const branch = await Branch.findById(req.params.id);
  
    if (!branch) {
      return next(
        new ErrorResponse(`Branch not found with id of ${req.params.id}`, 404)
      );
    }
  
    res.status(200).json({ success: true, data: branch });
  });


/**
*@desc Create Branch handler
*@route POST /api/v1/branch
*@access private
*@param 
*/
exports.createBranch = asyncHandler(async (req, res, next) => {
    
   
     req.body.compId= req.headers.comp_id;
     console.log("Branchcontroller now running"+req.body.compId);
    const branch = await Branch.create(req.body);
   
    res.status(201).json({
      success: true,
      message: "Branch Created",
      data: branch
    });
  });




/**
*@desc Invoke update method from DAL by pass id of Branch
*@route PUT /api/v1/branch/:id
*@access private
*@param Id {string} refrences parameter-entity Id
*@return json object 
*/
exports.updateBranch = asyncHandler(async (req, res, next) => {
   
  
    branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!branch) {
      return next(
        new ErrorResponse(`Branch not found with id of ${req.params.id} Failed to update`, 404)
      );
    }
    res.status(200).json({ success: true,  message: "Branch Updated",data: branch });
  });
/**
*@desc Invoke delete  method from DAL by pass id of Branch
*@route DELETE /api/v1/branch/:id
*@access private
*@param Id {string} refrences parameter-entity Id
*@return json object 
*/
exports.removeBranch = asyncHandler(async (req, res, next) => {
    const branch = await Branch.findById(req.params.id);
  
    if (!branch) {
      return next(
        new ErrorResponse(`Branch not found with id of ${req.params.id}`, 404)
      );
    }
  
   
    branch.remove();
  
    res.status(200).json({ success: true, message: "Branch deleted", data: {} });
  });