/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  // Passport

  'POST /login': 'AuthController.login',
  '/logout': 'AuthController.logout',

  // JobController

  '/job/:id/runner': 'JobController.getRunner',
  'GET /job/:id/resolve': 'JobController.resolve',

  // BlockController

  'GET /job/:id/fetch-block': 'BlockController.dispatchBlock',
  'POST /block/:id': 'BlockController.yieldBlock',
  'POST /block/:id/free': 'BlockController.releaseBlock'

};
