import { GRAPHQL_ENDPOINT } from "../../src/constants";
import { NOTES } from "../support/queries";

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
      url: GRAPHQL_ENDPOINT,
      body: { query: NOTES },
    }).then((res) => {
      expect(res.body.data).to.deep.equal(expectation);
    });
  });
});
