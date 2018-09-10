/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  AlgorithmController: {
    '*': ['isLoggedIn', 'isCreator'],
    'find': 'isLoggedIn',
    'findOne': 'isLoggedIn',
    'add': false,
    'remove': false,
    'replace': false
  },
  BlockController: {
    '*': false,
    'dispatchBlock': ['isLoggedIn', 'attachUser'],
    'yieldBlock': ['isLoggedIn', 'attachUser'],
    'releaseBlock': ['isLoggedIn', 'attachUser']
  },
  JobController: {
    '*': ['isLoggedIn', 'attachUser'],
    'getRunner': true,
    'add': false,
    'remove': false,
    'replace': false
  },
  UserController: {
    '*': false
  }

};
