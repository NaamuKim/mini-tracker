/// <reference types="cypress" />

import { STORAGE_KEYS } from "../../../src/constants/storage";
import { COOKIE } from "../../../src/constants/cookie";

export const clearStorages = () => {
  Object.values(STORAGE_KEYS).forEach((localStorageKeyName) => {
    cy.clearLocalStorage(localStorageKeyName);
  });
  cy.clearAllSessionStorage();
  cy.clearCookie(COOKIE.SESSION_ID);
};
