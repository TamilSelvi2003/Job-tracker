const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: String,
  date: String,
  link: String,
});

module.exports = mongoose.model('Job', jobSchema);
