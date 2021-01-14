import { IUser } from "./models/user";
import { Note } from "./models/note";
import { Request, Response } from "express";

export const createMongoNoteInstance = async (
  sender: IUser,
  receiver: IUser,
  status: string,
  url: string
) => {
  if (sender._id != null && receiver._id != null) {
    return new Note({
      sender: sender._id,
      receiver: receiver._id,
      status,
      url,
    }).save();
  }
};

export const slackQuery = (request: Request, response: Response) => {
  const { body } = request;
  response.send({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey <@${body.user}>\n<https://tapedit.netlify.app/?chan=${body.channel}&sender=${body.user}|Tape your message here!>\n:loud_sound:`,
        },
      },
    ],
  });
};
