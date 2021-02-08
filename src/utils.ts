import axios from "axios";
import dotenv from "dotenv";

import { IUser } from "./models/user";
import { Note } from "./models/note";

dotenv.config();

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

export const postToSlackWebhook = async (url: string) => {
  try {
    let res = await axios.post(`${process.env.SLACK_WEBHOOK_URL}`, {
      response_type: "in_channel",
      text: `Listen to your TapedIt note here: ${url}`,
    });
    console.log(`statusCode: ${res.status}`);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
