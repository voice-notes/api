import { GRAPHQL_ENDPOINT } from "../constants";

describe("Can retrieve users", () => {
  it("returns users when user query is fired", () => {
    const query = `
      {
        users{
					slackID
					senderNotes
					receiverNotes
        }
      }
    `;

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
      url: GRAPHQL_ENDPOINT, // graphql endpoint
      body: { query }, // or { query: query } depending if you are writing with es6
      failOnStatusCode: false, // not a must but in case the fail code is not 200 / 400
    }).then((res) => {
      cy.log(res.body.data);
      expect(res.body.data).to.deep.equal(expectation);
    });
  });
});
