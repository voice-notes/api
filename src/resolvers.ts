import { Note, INote } from "./models/note";
import { createMongoNoteInstance, postToSlackWebhook } from "./utils";

export default {
  Query: {
    notes: () => Note.find()
  },

  Mutation: {
    createNote: async (_: string, args: INote) => {
      const { slackID, audioUrl, responseUrl } = args;

      try {
        const note = await createMongoNoteInstance(
          slackID,
          audioUrl,
          responseUrl
        );
        postToSlackWebhook(responseUrl);
        return note;
        
      } catch(error) {
        console.log(error)
      }
      
    },
    
  },
};
