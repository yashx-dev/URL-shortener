import mongoose from "mongoose";
import User from "./User";

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
    trim: true,
  },

  shortCode: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    default: null,
  },
});

const Url = mongoose.model("Url", urlSchema);
export default Url;
