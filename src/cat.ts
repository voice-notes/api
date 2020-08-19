import mongoose from 'mongoose';

export interface ICat extends mongoose.Document {
    name: string; 
};

export const CatSchema = new mongoose.Schema({
name: {type:String, required: true},
});

const Cat = mongoose.model<ICat>('Cat', { CatSchema });
  
export default Cat;



// export interface IUser extends mongoose.Document {
//     name: string; 
//     somethingElse?: number; 
//   };
  
//   export const UserSchema = new mongoose.Schema({
//     name: {type:String, required: true},
//     somethingElse: Number,
//   });
  
//   const User = mongoose.model<IUser>('User', UserSchema);
//   export default User;