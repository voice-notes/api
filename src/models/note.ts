import mongoose, { Document, Model, Schema } from 'mongoose';
import { User, IUser } from './user';


export interface INote extends Document {
  _id: string;
  sender: string;
  receiver: string
  senderSlackID: string
  receiverSlackID: string
  status: string
  url: string
}

// export interface NoteModel extends Model<INote> {}

const schema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderSlackID: { type: String, required: true },
  receiverSlackID: { type: String, required: true },
  status: { type: String, required: true },
  url: { type: String, required: true },
})

export const Note = mongoose.model<INote>('Note', schema)
