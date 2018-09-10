/**
 * BlockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  dispatchBlock: async function(req, res) {
    if(req.param('id')) {
      let job = await Job.findOne({ id: req.param('id') }).populate('type')
      if (!job) return res.notFound();

      let existingBlock = await Block.findOne({ status: 'IDLE' });
      if(existingBlock) {
        existingBlock = (await Block.update({ id: existingBlock.id }, { status: 'RUNNING' }).fetch())[0];
        return res.ok({
          block: existingBlock,
          job
        });
      } else {
        let count = await Block.count({ job: job.id });
        let data = await sails.helpers.dispatch(count, job);

        if(data) {
          let block = await Block.create({
            job: job.id,
            status: 'RUNNING',
            data
          }).fetch();
          return res.ok({ block, job });
        } else {
          return res.ok({ job });
        }
      }
    } else {
      return res.badRequest();
    }
  },

  yieldBlock: async function(req, res) {
    let block = await Block.update({
      id: req.param('id'),
      status: 'RUNNING'
    }, {
      result: req.body,
      status: 'FINISHED'
    }).fetch();
    return res.ok(block);
  },

  releaseBlock: async function(req, res) {
    let block = await Block.update({
      id: req.param('id'),
      status: 'RUNNING'
    }, {
      status: 'RUNNING'
    }).fetch();
    return res.ok(block);
  }

};

