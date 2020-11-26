import { GRAPHQL_ENDPOINT } from "../../src/constants";
import { USERS } from "../support/queries";
import { ADD_NOTE } from "../support/mutations";

describe("Can add note", () => {
  it("Returns expected data on createNote mutation", () => {
    const expectation = {
      status: "RECORDED",
      url: "TEST",
    };
    cy.request({
      method: "post",
      url: GRAPHQL_ENDPOINT,
      body: { query: ADD_NOTE },
    }).then((res) => {
      expect(res.body.data.createNote).to.deep.equal(expectation);
    });
  });

  it("Adds Note ID to the User array", () => {
    cy.request({
      method: "post",
      url: GRAPHQL_ENDPOINT,
      body: { query: USERS },
    }).then((res) => {
      const { users } = res.body.data;
      expect(users[0].senderNotes.length).to.equal(1);
      expect(users[1].receiverNotes.length).to.equal(1);
    });
  });
});
