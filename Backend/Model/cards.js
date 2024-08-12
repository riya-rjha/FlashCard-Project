import mongoose from "mongoose";
const { Schema } = mongoose;

const NoteSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

export const Cards = mongoose.model("cards", NoteSchema);
