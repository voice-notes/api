import { notes, users } from "./data";
import { Note, INote } from './models/note'
import { Cat, ICat } from "./cat";


export default {
  Query: {
    notes: () => Note.find(),
    users: () => users,
    cats: () => Cat.find()
  },

  Mutation: {
    createCat: (_:string, {name, colour}:ICat) => {
      const kitty = new Cat({name, colour});
      return kitty.save();
    },
    createNote: (_:string, {sender, receiver, status, url}:INote) => {
      const note = new Note({sender, receiver, status, url});
      return note.save();
    }
  }
}