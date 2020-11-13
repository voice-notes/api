import { GRAPHQL_ENDPOINT } from "../../src/constants";
import { USERS_QUERY } from "../support/query_constants";

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
      url: GRAPHQL_ENDPOINT, // graphql endpoint
      body: { query: USERS_QUERY }, // or { query: query } depending if you are writing with es6
      failOnStatusCode: false, // not a must but in case the fail code is not 200 / 400
    }).then((res) => {
      console.log(res.body.data);
      expect(res.body.data).to.deep.equal(expectation);
    });
  });
});
