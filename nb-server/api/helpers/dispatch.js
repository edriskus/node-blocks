module.exports = {


  friendlyName: 'Dispatch',


  description: 'Dispatch something.',


  inputs: {
    count: { type: 'number', required: true },
    job: { type: 'json', required: true }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let id = inputs.count;
    let res;
    try {
      let fn = new Function('id', 'inputs', 'job', inputs.job.type.builder_code);
      res = fn(id, inputs.job.inputs, inputs.job);
    } catch(e) {
      res = {
        error: e + '',
        job: inputs.job
      };
    }
    return exits.success(res);
  }


};

