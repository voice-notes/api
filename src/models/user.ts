import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
    slackID: string;
    senderNotes: Array<string>; 
    receiverNotes: Array<string>
}

const schema = new Schema({
    slackID: { type: String, required: true },
    senderNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    receiverNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}] 
})

export const User = mongoose.model<IUser>('User', schema)