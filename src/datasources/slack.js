import { RESTDataSource } from "apollo-datasource-rest";

class slackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://slack.com/api/";
  }

  sendButton() {
    console.log("I'm about to send a button");
    this.post(
      "chat.postMessage",
      {
        channel: "D01A7T2H8G2",
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
          Authorization: "Bearer token",
        },
      }
    );
    return "Button successfully sent";
  }
}

export default slackAPI;
