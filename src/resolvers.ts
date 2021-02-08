import { Note, INote } from "./models/note";
import { User, IUser } from "./models/user";
import { createMongoNoteInstance, postToSlackWebHook } from "./utils";

export default {
  Query: {
    notes: () => Note.find(),
    users: () => User.find(),
  },

  Mutation: {
    createNote: async (_: string, args: INote) => {
      const { sender, receiver, status, url } = args;

      const [dbSender, dbReceiver] = await Promise.all([
        User.findOne({ slackID: sender }),
        User.findOne({ slackID: receiver }),
      ]);

      if (dbSender != null && dbReceiver != null) {
        const note = await createMongoNoteInstance(
          dbSender,
          dbReceiver,
          status,
          url
        );

        if (note != undefined) {
          dbSender.senderNotes.push(note._id);
          dbReceiver.receiverNotes.push(note._id);
          const users = [dbSender, dbReceiver];
          await Promise.all(users.map((user) => user.save()));
        }
        postToSlackWebHook(url);
        return note;
      }
    },
    createUser: (_: string, args: IUser) => {
      const { slackID } = args;
      const user = new User({ slackID });
      return user.save();
    },
  },
};
