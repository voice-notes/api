import { Note, INote } from "./models/note";
import { saveNoteToDB, postToSlackWebhook } from "./utils";

export default {
  Query: {
    notes: () => Note.find()
  },

  Mutation: {
    createNote: async (_: string, args: INote) => {
      const { slackID, audioUrl, responseUrl } = args;

      try {
        const note = await saveNoteToDB(
          slackID,
          audioUrl,
          responseUrl
        );
        postToSlackWebhook(audioUrl, responseUrl);
        return note;
        
      } catch(error) {
        console.log(error)
      }
      
    },
    
  },
};
