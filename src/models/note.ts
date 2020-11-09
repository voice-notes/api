import mongoose, { Document, Model, Schema } from 'mongoose';

export interface INote extends Document {
  sender: string;
  receiver: string
  status: string
  url: string
}

// export interface NoteModel extends Model<INote> {}

const schema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true },
  url: { type: String, required: true },
})

export const Note = mongoose.model<INote>('Note', schema)
