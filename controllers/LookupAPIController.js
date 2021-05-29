//=============================================================
// LookupAPIController.js v1.0.0
//=============================================================
//=============================================================
//Author:Hani 1-10-2020
//Updated:
//=============================================================
/**
 *@desc Lookup API controller to handling API CRUD operation.
 *@version 1.0
 */

const ErrorResponse = require('../utils/errorReponse');

const asyncHandler = require('../middleware/asyncHandler');

//import Lookup Model
const LookupAPIField = require('../models/LookupAPIFieldModel');

/**
 *@desc invoke get method from DAL
 *@route GET /api/v1/lookupapifield
 *@access private
 *@return json object
 */
exports.getLookupAll = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.responseResults);
});

/**
 *@desc Invoke get method from DAL by pass id of Lookup
 *@route GET /api/v1/lookupapifield/:id
 *@access private
 *@param Id {string} refrences parameter-entity Id
 *@return json object
 */
exports.getLookUpById = asyncHandler(async (req, res, next) => {
  const lookup = await LookupAPIField.findById(req.params.id);

  if (!lookup) {
    return next(
      new ErrorResponse(`Lookup not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: lookup });
});

/**
 *@desc Create Lookup handler
 *@route POST /api/v1/lookupapifield
 *@access private
 *@param
 */
exports.createLookUp = asyncHandler(async (req, res, next) => {
  const lookup = await LookupAPIField.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Refrences List Created',
    data: lookup,
  });
});

/**
 *@desc Invoke update method from DAL by pass id of Lookup
 *@route PUT /api/v1/lookupapifield/:id
 *@access private
 *@param Id {string} refrences parameter-entity Id
 *@return json object
 */
exports.updateLookup = asyncHandler(async (req, res, next) => {
  const lookup = await LookupAPIField.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!lookup) {
    return next(
      new ErrorResponse(
        `Lookup not found with id of ${req.params.id} Failed to update`,
        404
      )
    );
  }
  res
    .status(200)
    .json({ success: true, message: 'Lookup Updated', data: lookup });
});
/**
 *@desc Invoke delete  method from DAL by pass id of Lookup
 *@route DELETE /api/v1/lookupapifield/:id
 *@access private
 *@param Id {string} refrences parameter-entity Id
 *@return json object
 */
exports.removeLookup = asyncHandler(async (req, res, next) => {
  const lookup = await LookupAPIField.findById(req.params.id);

  if (!lookup) {
    return next(
      new ErrorResponse(`Group not found with id of ${req.params.id}`, 404)
    );
  }

  lookup.remove();

  res.status(200).json({ success: true, message: 'Lookup deleted', data: {} });
});
