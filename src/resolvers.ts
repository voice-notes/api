import { notes, users } from "./data";
import { Note, INote } from './models/note'
import { Cat, ICat } from "./cat";
import { User, IUser } from './models/user'


export default {
  Query: {
    notes: () => Note.find(),
    users: () => User.find(),
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
    },
    createUser: (_:string, {slackID}:IUser) => {
      const user = new User({slackID});
      return user.save()
    }
  }
}