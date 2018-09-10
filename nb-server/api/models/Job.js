/**
 * Job.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: { type: 'string', required: true },
    owner: { model: 'user', required: true },
    type: { model: 'algorithm', required: true },
    description: { type: 'string' },
    inputs: { type: 'json' },
    results: { type: 'json' },
  },

};

