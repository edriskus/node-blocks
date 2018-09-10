module.exports = {


  friendlyName: 'Finalize',


  description: 'Finalize something.',


  inputs: {
    blocks: { type: 'json', required: true },
    job: { type: 'json', required: true }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let res;
    try {
      let fn = new Function('blocks', 'job', inputs.job.type.resolve_code);
      res = fn(inputs.blocks, inputs.job);
    } catch(e) {
      res = {
        error: e + '',
        job: inputs.job
      };
    }
    return exits.success(res);
  }


};

