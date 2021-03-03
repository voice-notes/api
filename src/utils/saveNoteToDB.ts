import { Note } from "../models/note";

export const saveNoteToDB = async (
    slackID: string,
    audioUrl: string,
    responseUrl: string
  ) => {
    try {
      return new Note({
        slackID,
        audioUrl,
        responseUrl,
      }).save();
    } catch (error) {
      console.log(error);
    }
  };
  