import { Request, Response } from "express";

import { returnUrlParameters } from "./returnUrlParameters";
import { FRONT_END_URL } from "../config";

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
            text: `<http://${FRONT_END_URL}/?&sender=${user_id}&p1=${param1}&p2=${param2}&p3=${param3}|Tape your message here!>`,
          },
        },
      ],
    });
  }
};
