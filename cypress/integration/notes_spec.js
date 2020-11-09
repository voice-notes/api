describe("Server set up", () => {
  beforeEach(() => {
    cy.exec("yarn run db:drop");
  });

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
    cy.task("addUser", { slackID: "TestSender" });
    cy.task("addUser", { slackID: "TestReceiver" });
    cy.request({
      method: "post",
      url: "http://localhost:4000/graphql/", // graphql endpoint
      body: { noteMutation }, // or { query: query } depending if you are writing with es6
      failOnStatusCode: false, // not a must but in case the fail code is not 200 / 400
    }).then((res) => {
      expect(res.body.data.createNote.senderSlackId).to.equal("TestSender");
      expect(res.body.data.createNote.receiverSlackId).to.equal("TestReceiver");
      expect(res.body.data.createNote.status).to.equal("RECORDED");
      expect(res.body.data.createNote.url).to.equal("TEST");
    });
  });
});
