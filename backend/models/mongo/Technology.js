const mongoose = require("./db");

const TechnologySchema = mongoose.Schema({
  name: String,
  description: String,
  users: Array,
});

const Technoloy = new mongoose.model("Technology", TechnologySchema);

module.exports = Technoloy;
