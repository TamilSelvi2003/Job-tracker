const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

exports.createJob = async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
};

exports.updateJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
  res.json(job);
};

exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  await Job.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};
