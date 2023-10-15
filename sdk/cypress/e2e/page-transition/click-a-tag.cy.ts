/// <reference types="cypress" />

import { HTTP_API_URL, NOT_SPA_URL } from "../constants/url";
import { COOKIE } from "../../../src/constants/cookie";

describe("click a tag and tagging transition information well", () => {
  it("checks request body has page view properties", () => {
    cy.visit(NOT_SPA_URL);
    cy.clearCookie(COOKIE.SESSION_ID).then(() => {
      cy.intercept("POST", HTTP_API_URL + "/page-view").as("tagData");
      cy.get('[href="2.html"]').click();
      cy.wait(1000);
      cy.wait("@tagData").then(({ request: req }) => {
        expect(req.body.fromPageLocation).to.equal("/1.html");
        expect(req.body.pageLocation).to.equal("/2.html");
      });
    });
  });
});
