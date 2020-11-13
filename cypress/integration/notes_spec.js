import { GRAPHQL_ENDPOINT } from "../../src/constants";
import { USERS_QUERY, ADD_NOTE_MUTATION } from "../support/query_constants";


describe("Can add note", () => {
  it("Returns expected data on createNote mutation", () => {
    
    const expectation = {
      receiverSlackID: "TestReceiver",
      senderSlackID: "TestSender",
      status: "RECORDED",
      url: "TEST",
    };
    cy.request({
      method: "post",
      url: GRAPHQL_ENDPOINT,
      body: { query: ADD_NOTE_MUTATION },
    }).then((res) => {
      expect(res.body.data.createNote).to.deep.equal(expectation);

    });
  });

  it("Adds Note ID to the User array", () => {
    cy.request({
      method: "post",
      url: GRAPHQL_ENDPOINT,
      body: { query: USERS_QUERY }
    }).then((res) => {
      expect(res.body.data.users[0].senderNotes.length).to.equal(1)
      expect(res.body.data.users[1].receiverNotes.length).to.equal(1)
    })
  })

});
