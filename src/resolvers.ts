import { Note, INote } from "./models/note";
import { User, IUser } from "./models/user";
// import { DataSources } from "apollo-server-core/dist/graphqlOptions";
// import { IDataSources } from '../src/index';

export default {
  Query: {
    notes: () => Note.find(),
    users: () => User.find(),
    test: async (_: any, __: any, { dataSources }: any) => {
      console.log("I'm in the resolver");
      return dataSources.slackAPI.sendButton();
    },
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
