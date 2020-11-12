import { GRAPHQL_ENDPOINT } from "../../src/constants";


describe("Can add note", () => {
  it("Returns expected data on createNote mutation", () => {
    const noteMutation = 
      `mutation {
        createNote(sender:"TestSender", receiver:"TestReceiver", status:"RECORDED", url:"TEST"){
          receiverSlackID
          senderSlackID
          status
          url
        }
      }`;
    const expectation = {
      receiverSlackID: "TestReceiver",
      senderSlackID: "TestSender",
      status: "RECORDED",
      url: "TEST",
    };
    cy.request({
      method: "post",
      url: GRAPHQL_ENDPOINT, // graphql endpoint
      body: { query: noteMutation }, // or { query: query } depending if you are writing with es6
      failOnStatusCode: false, // not a must but in case the fail code is not 200 / 400
    }).then((res) => {
      expect(res.body.data.createNote).to.deep.equal(expectation);
    });
  });
});
