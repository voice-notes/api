import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    slackID: string;
    senderNotes: Array<string>; 
    receiverNotes: Array<string>
}

const schema = new Schema({
    slackID: { type: String, required: true },
    senderNotes: {type: Array, required: true },
    receiverNotes: {type: Array, required: true } 
})

export const User = mongoose.model<IUser>('User', schema)