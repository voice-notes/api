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

const returnUrlParameters = (url: string) => {
  const splitUrl = url.split("/");
  const index = splitUrl.length;
  return [splitUrl[index - 3], splitUrl[index - 2], splitUrl[index - 1]];
};

export const slackQuery = (request: Request, response: Response) => {
  const { body } = request;
  console.log(returnUrlParameters(body.response_url));
  const [param1, param2, param3] = returnUrlParameters(body.response_url);

  console.log(request.body);
  response.send({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey <@${body.user_id}>\n<http://localhost:3000/?chan=${body.channel_id}&sender=${body.user_id}&p1=${param1}&p2=${param2}&p3=${param3}|Tape your message here!>\n:loud_sound:`,
        },
      },
    ],
  });
};