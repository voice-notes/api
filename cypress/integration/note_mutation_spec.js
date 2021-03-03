import { returnGraphqlEndpoint } from "../../src/utils/returnGraphqlEndpoint";
import { ADD_NOTE } from "../support/mutations";

const graphqlEndpoint = returnGraphqlEndpoint();

describe("Can add note", () => {
  it("Returns expected data on createNote mutation", () => {
    const expectation = {
      slackID: "TestSender",
      audioUrl: "Hello, World!",
    };
    cy.request({
      method: "post",
      url: graphqlEndpoint,
      body: { query: ADD_NOTE },
    }).then((res) => {
      expect(res.body.data.createNote).to.deep.equal(expectation);
    });
  });
});
