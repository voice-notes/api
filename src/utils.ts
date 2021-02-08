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

export const postToSlackWebHook = (url: string) => {
  axios
    .post(`${process.env.SLACK_WEBHOOK_URL}`, {
      response_type: "in_channel",
      text: `Listen to your TapedIt note here: ${url}`,
    })
    .then((res) => {
      console.log(`Success! Response:`);
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};
