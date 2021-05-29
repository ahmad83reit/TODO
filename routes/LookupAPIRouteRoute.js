//=============================================================
// LookupAPIRoute.js v1.0.0
//=============================================================

/**
 *@desc APIRoutes for Lookup :Routes Lookup Field resources
 *@version 1.0
 */

const Express = require('express');
const Router = Express.Router({ mergeParams: true });
const {
  createLookUp,
  getLookupAll,

  getLookUpById,
  updateLookup,
  removeLookup,
} = require('../controllers/LookupAPIController');

const LookupAPIField = require('../models/LookupAPIFieldModel');

const responseResults = require('../middleware/responseResult');

Router.route('/')
  .get(responseResults(LookupAPIField, ['refrence']), getLookupAll)
  .post(createLookUp);

Router.route('/:id').get(getLookUpById).put(updateLookup).delete(removeLookup);

module.exports = Router;
