const mongoose = require("./db");

const MessageSchema = mongoose.Schema(
  {
    sender: Number,
    chatId: mongoose.Schema.Types.ObjectId,
    content: String,
    moderated: Boolean,
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Message = new mongoose.model("Message", MessageSchema);

module.exports = Message;
