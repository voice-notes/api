import { ADD_NOTE } from "../support/mutations";

describe("Can add note", () => {
  it("Returns expected data on createNote mutation", () => {
    const expectation = {
      slackID: "TestSender",
      audioUrl: "Hello, World!",
    };
    cy.request({
      method: "post",
      url: Cypress.env("GRAPHQL_ENDPOINT"),
      body: { query: ADD_NOTE },
    }).then((res) => {
      expect(res.body.data.createNote).to.deep.equal(expectation);
    });
  });
});
