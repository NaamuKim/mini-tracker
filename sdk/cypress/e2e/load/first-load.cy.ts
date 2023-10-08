/// <reference types="cypress" />

import { STORAGE_KEYS } from "../../../src/constants/storage";
import { COOKIE } from "../../../src/constants/cookie";
import { HTTP_API_URL, NOT_SPA_URL, SPA_URL } from "../constants/url";

const runSdkInitialLoadTests = (visitURL: string) => {
  beforeEach(() => {
    cy.intercept("POST", HTTP_API_URL + "/page-view").as("tagData");
    cy.visit(visitURL);
    Object.values(STORAGE_KEYS).forEach((localStorageKeyName) => {
      cy.clearLocalStorage(localStorageKeyName);
    });
    cy.clearAllSessionStorage();
    cy.clearCookie(COOKIE.SESSION_ID);
  });

  it("checks request body has page view properties", () => {
    cy.wait("@tagData").then(({ request: req }) => {
      expect(req.body).to.have.property("baseUrl");
      expect(req.body).to.have.property("pageLocation");
      expect(req.body).to.have.property("referrer");
      expect(req.body).to.have.property("entryTime");
      expect(req.body).to.have.property("os");
      expect(req.body).to.have.property("device");
    });
  });

  it("checks request body not to have page transition properties", () => {
    cy.wait("@tagData").then(({ request: req }) => {
      expect(req.body).not.to.have.property("transitionTime");
      expect(req.body).not.to.have.property("elementSelector");
      expect(req.body).not.to.have.property("fromPageLocation");
      expect(req.body).not.to.have.property("fromPageExitTime");
    });
  });

  it("checks set-cookie header after SDK loaded", () => {
    cy.wait("@tagData").then(({ response: res }) => {
      expect(res.headers).to.have.property("set-cookie");
      const setCookieHeader = res.headers["set-cookie"][0];
      expect(setCookieHeader).to.include(COOKIE.SESSION_ID);
      expect(setCookieHeader).to.include("Expires");
    });
  });
};

describe("SDK initial load", () => {
  context("not spa page", () => {
    runSdkInitialLoadTests(NOT_SPA_URL);
  });

  context("spa page", () => {
    runSdkInitialLoadTests(SPA_URL);
  });
});

const runDoNotTaggingTwiceTests = (visitURL: string) => {
  let callCount = 0;
  beforeEach(() => {
    cy.intercept("POST", HTTP_API_URL + "/page-view", () => {
      callCount++;
    }).as("tagData");
    cy.visit(visitURL);
    Object.values(STORAGE_KEYS).forEach((localStorageKeyName) => {
      cy.clearLocalStorage(localStorageKeyName);
    });
    cy.clearAllSessionStorage();
    cy.clearCookie(COOKIE.SESSION_ID);
  });

  afterEach(() => {
    callCount = 0;
  });

  it("checks not to send page view request twice", () => {
    cy.wait("@tagData").then(() => {
      cy.wrap(callCount).should("eq", 1);
    });
  });
};

describe("Do not tagging twice", () => {
  context("not spa page", () => {
    runDoNotTaggingTwiceTests(NOT_SPA_URL);
  });

  context("spa page", () => {
    runDoNotTaggingTwiceTests(SPA_URL);
  });
});
