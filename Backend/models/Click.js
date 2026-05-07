import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Url",
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
});

const Click = mongoose.model("Click", clickSchema);
export default Click;
