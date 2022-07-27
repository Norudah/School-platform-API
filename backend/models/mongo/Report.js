const mongoose = require("./db");

const ReportSchema = mongoose.Schema({
  reportType: {
    type: String,
    enum: ["OFFENSIVE_PROFILE", "OFFENSIVE_MESSAGE", "FAKE_PROFILE"],
    default: "OFFENSIVE_PROFILE",
  },
  title: String,
  description: String,
  createdAt: Date,
  status: {
    type: String,
    enum: ["PENDING", "RESOLVED", "CANCELED"],
    default: "PENDING",
  },
  userId: {
    type: Number,
    required: false,
  },
  messageObjetId: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
});

const Report = new mongoose.model("Report", ReportSchema);

module.exports = Report;
