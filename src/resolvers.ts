import { Note, INote } from './models/note'
import { User, IUser } from './models/user'


export default {
  Query: {
    notes: () => Note.find(),
    users: () => User.find(),
  },

  Mutation: {
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