import { returnGraphqlEndpoint } from "../../src/utils/returnGraphqlEndpoint";
import { NOTES } from "../support/queries";

const graphqlEndpoint = returnGraphqlEndpoint();
console.log(returnGraphqlEndpoint);
console.log(`${graphqlEndpoint} outside the descibe block`);

describe("Can retrieve notes", () => {
  it("returns notes when note query is fired", () => {
    const expectation = {
      notes: [
        {
          slackID: "TestSender1",
          audioUrl: "TestURL1",
          responseUrl: "ResponseURL1",
        },
        {
          slackID: "TestSender2",
          audioUrl: "TestURL2",
          responseUrl: "ResponseURL2",
        },
      ],
    };
    console.log(`${graphqlEndpoint} inside the descibe block`);
    cy.task("addNoteToDB", {
      slackID: "TestSender1",
      audioUrl: "TestURL1",
      responseUrl: "ResponseURL1",
    });
    cy.task("addNoteToDB", {
      slackID: "TestSender2",
      audioUrl: "TestURL2",
      responseUrl: "ResponseURL2",
    });

    cy.request({
      method: "post",
      url: graphqlEndpoint,
      body: { query: NOTES },
    }).then((res) => {
      expect(res.body.data).to.deep.equal(expectation);
    });
  });
});
