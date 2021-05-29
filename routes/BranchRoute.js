//=============================================================
// BranchRoute.js v1.0.0
//=============================================================

/**
*@desc APIRoutes for Branch :Routes branch resources
*@version 1.0
*/

const Express = require('express');
const Router = Express.Router({ mergeParams: true });





const {
    createBranch,
    getBranchAll,
    getBranchById,
    updateBranch,
    removeBranch
  } = require('../controllers/BranchController');

  const Branch = require('../models/BranchModel');

  const responseResults = require('../middleware/responseResult');





Router
.route('/')
.get(responseResults(Branch,false),getBranchAll)
.post(createBranch);

Router
.route('/:id')
.get(getBranchById)
.put(updateBranch)
.delete(removeBranch);
  
   
module.exports=Router;