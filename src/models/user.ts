import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
    slackID: string;
}

const schema = new Schema({
    slackID: { type: String, required: true },

})

export const User = mongoose.model<IUser>('User', schema)