import axios from "axios";

export const postToSlackWebhook = async (
    audioUrl: string,
    responseUrl: string
  ) => {
    try {
      const res = await axios.post(`${responseUrl}`, {
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