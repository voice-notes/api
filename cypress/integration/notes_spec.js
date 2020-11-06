import { GRAPHQL_ENDPOINT } from "../constants";

describe("Can add note", () => {
  it("Returns expected data on addNote mutation", () => {
    const noteMutation = `
      mutation{
        createNote(sender:"TestSender", receiver:"TestReceiver", status:"RECORDED", url:"TEST"){
          receiverSlackId
          senderSlackId
          status
          url
        }
      }
    `;

    const expectation = {
      receiver: "TestReceiver",
      sender: "TestSender",
      status: "RECORDED",
      url: "TEST",
    };
    cy.request({
      method: "post",
      url: GRAPHQL_ENDPOINT, // graphql endpoint
      body: { noteMutation }, // or { query: query } depending if you are writing with es6
      failOnStatusCode: false, // not a must but in case the fail code is not 200 / 400
    }).then((res) => {
      expect(res.body.data.createNote).to.equal(expectation);
    });
  });
});
