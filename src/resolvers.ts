import { notes, users } from "./data";
import { Cat, CatModel } from "./cat";

export default {
  Query: {
    notes: () => notes,
    users: () => users,
    cats: () => Cat.find()
  },

  Mutation: {
    createCat: (_:string, {name}:CatModel) => {
      const kitty = new Cat({name});
      return kitty.save();
    }
  }
}