import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICat extends Document {
    name: string; 
    colour: string;
};

const schema = new Schema({
    name: { type: String, required: true },
    colour: { type: String, required: true },
})

export const Cat = mongoose.model<ICat>('Cat', schema);
