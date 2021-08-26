import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
}, { timestamps: { createdAt: 'created_at' } });

export default mongoose.model("Message", Schema);
