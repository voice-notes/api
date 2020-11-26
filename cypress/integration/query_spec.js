import { GRAPHQL_ENDPOINT } from "../../src/constants";
import { USERS } from "../support/queries";

describe("Can retrieve users", () => {
  it("returns users when user query is fired", () => {
    const expectation = {
      users: [
        {
          slackID: "TestSender",
          senderNotes: [],
          receiverNotes: [],
        },
        {
          slackID: "TestReceiver",
          senderNotes: [],
          receiverNotes: [],
        },
      ],
    };
    cy.request({
      method: "post",
      url: GRAPHQL_ENDPOINT,
      body: { query: USERS },
    }).then((res) => {
      expect(res.body.data).to.deep.equal(expectation);
    });
  });
});
