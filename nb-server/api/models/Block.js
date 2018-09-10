/**
 * Block.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    job: { model: 'job', required: true },
    status: { type: 'string', required: true },
    data: { type: 'json', required: true },
    result: { type: 'json' }

  },

};

