import axios from "axios";
import dotenv from "dotenv";

import { Note } from "./models/note";
import { Request, Response } from "express";

dotenv.config();

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

const returnUrlParameters = (url: string) => {
  const splitUrl = url.split("/");
  const index = splitUrl.length;
  return [splitUrl[index - 3], splitUrl[index - 2], splitUrl[index - 1]];
};

export const slackQuery = (request: Request, response: Response) => {
  const { user_id, response_url } = request.body;
  if (response_url) {
    const [param1, param2, param3] = returnUrlParameters(response_url);

    response.send({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `<http://localhost:3000/?&sender=${user_id}&p1=${param1}&p2=${param2}&p3=${param3}|Tape your message here!>`,
          },
        },
      ],
    });
  }
};

export const postToSlackWebhook = async (
  audioUrl: string,
  responseUrl: string
) => {
  try {
    let res = await axios.post(`${responseUrl}`, {
      response_type: "in_channel",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `<${audioUrl}|Click to listen>`,
          },
        },
      ],
    });
    console.log(`statusCode: ${res.status}`);
  } catch (error) {
    console.error(error);
  }
};
