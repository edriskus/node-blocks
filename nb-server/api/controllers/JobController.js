/**
 * JobController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  find: async function(req, res) {
    let jobs = await Job.find({ owner: req.user.id });
    return res.ok(jobs);
  },

  findOne: async function(req, res) {
    let job = await Job.findOne({
      id: req.param('id'),
      owner: req.user.id
    });
    if(!job) return res.notFound();
    let type = await Algorithm.findOne({ id: job.type });
    let blocks = await Block.find({ job: job.id });
    return res.ok({
      ...job,
      type: {
        id: job.type,
        title: type.title,
        gpu: type.gpu,
        fa: type.fa
      },
      blocks: blocks.length,
      running_blocks: blocks.filter(b => b.status == 'RUNNING').length,
      idle_blocks: blocks.filter(b => b.status == 'IDLE').length,
      finished_blocks: blocks.filter(b => b.status == 'FINISHED').length
    })
  },

  create: async function(req, res) {
    let job = await Job.create({
      ...req.body,
      owner: req.user.id
    }).fetch();
    return res.ok(job);
  },

  update: async function(req, res) {
    let job = await Job.update({
      id: req.param('id')
    }, {
      ...req.body,
      owner: req.user.id
    });
    return res.ok(job);
  },

  getRunner: async function(req, res) {
    let job = await Job.findOne({ id: req.param('id') }).populate('type');
    if(!job) return res.notFound();
    return res.send(job.type.client_code);
  },

  destroy: async function(req, res) {
    let job = (await Job.destroy(req.param('id')).fetch())[0];
    await Block.destroy({ job: job.id });
    return res.ok(job);
  },

  resolve: async function(req, res) {
    if(req.param('id')) {
      let job = await Job.findOne({ id: req.param('id') }).populate('type')
      if (!job) return res.notFound();
      let blocks = await Block.find({ job: job.id });
      let data = await sails.helpers.finalize(blocks, job);
      return res.ok(data);
    } else {
      return res.badRequest();
    }
  }

  /**
   * Roadmap:
   *
   * 0. Block is created - status = 'IDLE'
   * 1. Block is dispached - status = 'RUNNING'
   * 2. Block is computed - status = 'FINISHED'
   * 3. Block is validated ????? 'DONE'
   */

};

