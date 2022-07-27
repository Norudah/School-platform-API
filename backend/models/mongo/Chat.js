const mongoose = require("./db");

const ChatSchema = mongoose.Schema({
  participants: Array,
});

const Chat = new mongoose.model("Chat", ChatSchema);

module.exports = Chat;
