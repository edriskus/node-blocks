/**
 * Algorithm.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: { type: 'string', required: true },
    gpu: { type: 'boolean', required: true },
    fa: { type: 'string', required: true },
    description: { type: 'string' },
    inputs: { type: 'json' },
    results: { type: 'json' },
    builder_code: { type: 'string' },
    client_code: { type: 'string' },
    resolve_code: { type: 'string' }
  },

};

