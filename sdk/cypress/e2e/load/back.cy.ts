/// <reference types="cypress" />

import { HTTP_API_URL, NOT_SPA_URL, SPA_URL } from "../constants/url";
import { clearStorages } from "../utils/storage";

const runBackButtonTests = ({
  visitURL,
  aTagSelector = "a",
}: {
  visitURL: string;
  aTagSelector?: string;
}) => {
  describe("Back button test", () => {
    beforeEach(() => {
      cy.intercept("POST", HTTP_API_URL + "/page-view").as("tagData");
      cy.visit(visitURL);
      clearStorages();
    });

    it("checks page view is sent when back button is clicked", () => {
      cy.wait("@tagData").then(({ request: req }) => {
        const body = req.body;
        cy.get(aTagSelector).first().click();
        cy.go("back");
        cy.wait("@tagData").then(({ request: { body: newBody } }) => {
          expect(newBody.os).to.equal(body.os);
          expect(newBody.device).to.equal(body.device);
          expect(newBody.baseUrl).to.equal(body.baseUrl);
          expect(newBody.referrer).not.to.equal(body.referrer);
        });
      });
    });
  });
};

describe("SDK back button", () => {
  context("spa page", () => {
    runBackButtonTests({
      visitURL: SPA_URL,
      aTagSelector: "a[href='/example/2']",
    });
  });
  context("not spa page", () => {
    runBackButtonTests({ visitURL: NOT_SPA_URL });
  });
});
