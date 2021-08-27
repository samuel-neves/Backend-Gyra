import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
});

export default mongoose.model("Room", Schema);
