import { notes, users } from "./data";

export default {
  Query: {
    notes: () => notes,
    users: () => users,
  }
}

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));