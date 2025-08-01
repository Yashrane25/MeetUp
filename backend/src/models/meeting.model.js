import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema({
  user_id: { type: String },
  meetingCode: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
});

const Meeting = mongoose.model("Meeting", meetingSchema);

export { Meeting }; // use this when we want to export multiple things from a single js file. using default we can export single thing. //
