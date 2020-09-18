import { RESTDataSource } from "apollo-datasource-rest";
import dotenv from "dotenv";

dotenv.config();

class slackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://slack.com/api/";
  }

  sendButton({ channelId }) {
    console.log(`I'm about to send a button to the channel: ${channelId}`);
    this.post(
      "chat.postMessage",
      {
        channel: channelId,
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "Tape It!",
              emoji: true,
            },
          },
          {
            type: "image",
            image_url:
              "https://i1.wp.com/thetempest.co/wp-content/uploads/2017/08/The-wise-words-of-Michael-Scott-Imgur-2.jpg?w=1024&ssl=1",
            alt_text: "inspiration",
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Tape Message",
                  emoji: true,
                },
                value: "click_me_123",
              },
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_ACCESS_TOKEN}`,
        },
      }
    );
    return "Button successfully sent";
  }
}

export default slackAPI;
