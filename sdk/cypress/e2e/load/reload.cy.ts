/// <reference types="cypress" />

import { HTTP_API_URL, NOT_SPA_URL, SPA_URL } from "../constants/url";

const testTaggingDoesNotDuplicateOnReload = (visitURL: string) => {
  let callCount = 0;
  beforeEach(() => {
    callCount = 0;
    cy.intercept("POST", HTTP_API_URL + "/page-view", () => {
      callCount++;
    }).as("tagData");
    cy.visit(visitURL);
  });

  it("checks reload does not send page view twice", () => {
    cy.wait("@tagData").then(() => {
      cy.reload();
    });

    cy.wait("@tagData").then(() => {
      cy.wrap(callCount).should("eq", 1);
    });
  });
};

describe("SDK reload", () => {
  context("not spa page", () => {
    testTaggingDoesNotDuplicateOnReload(NOT_SPA_URL);
  });

  context("spa page", () => {
    testTaggingDoesNotDuplicateOnReload(SPA_URL);
  });
});
