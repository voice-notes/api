import { notes, users } from "./data";
import { Cat } from "./cat";
import Mongoose from 'mongoose';

export default {
  Query: {
    notes: () => notes,
    users: () => users,
  },

  Mutation: {
    createCat: (_, {name}) => {
      const kitty = new Cat({name});
      return kitty.save();
    }
  }
}

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));