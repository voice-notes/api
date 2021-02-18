import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
  _id: string;
  slackID: string;
  audioUrl: string;
  responseUrl: string;
}

const schema = new Schema({
  slackID: { type: String, required: true },
  audioUrl: { type: String, required: true },
  responseUrl: { type: String, required: true }
});

export const Note = mongoose.model<INote>("Note", schema);
