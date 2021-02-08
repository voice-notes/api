import axios from "axios";

import { Note, INote } from "./models/note";
import { User, IUser } from "./models/user";
import { createMongoNoteInstance } from "./utils";

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
        axios
          .post(
            "https://hooks.slack.com/services/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",
            {
              response_type: "in_channel",
              text: `Listen to your TapedIt note here: ${url}`,
            }
          )
          .then((res) => {
            console.log(`Success! Response:`);
            console.log(res);
          })
          .catch((error) => {
            console.error(error);
          });
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
