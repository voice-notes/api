import { Note, INote } from "./models/note";
import { User, IUser } from "./models/user";

export default {
  Query: {
    notes: () => Note.find(),
    users: () => User.find(),
    test: () => "Hello Slack",
  },

  Mutation: {
    createNote: (_: string, { sender, receiver, status, url }: INote) => {
      const note = new Note({ sender, receiver, status, url });
      return note.save;
      // have code pushing this note ID to sender - sent array
      // reciever - recievedArray
    },
    createUser: (_: string, { slackID }: IUser) => {
      const senderNotes: Array<string> = [];
      const receiverNotes: Array<string> = [];
      const user = new User({ slackID, senderNotes, receiverNotes });
      return user.save();
    },
  },
};
