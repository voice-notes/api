import mongoose, { Document, Model, Schema } from 'mongoose';

declare interface ICat extends Document {
    name: string; 
};

export interface CatModel extends Model<ICat> {}

const schema = new Schema({
    name: { type: String, required: true },
})

export const Cat = mongoose.model<ICat>('Cat', schema);
