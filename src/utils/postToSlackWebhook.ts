import axios from "axios";

export const postToSlackWebhook = async (
    audioUrl: string,
    responseUrl: string,
    slackID: string
  ) => {
    try {
      const res = await axios.post(`${responseUrl}`, {
        response_type: "in_channel",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `<@${slackID}> has left a voice message!\n<${audioUrl}|Click to listen>`,
            },
          },
        ],
      });
      console.log(`statusCode: ${res.status}`);
    } catch (error) {
      console.error(error);
    }
  };
  